/*
==================================================
PREVIA

OrderClient.js

Order Client

Responsibility:
- Send order requests from the Frontend to PREVIA Core.
- Provide Telegram WebApp initData to Core.
- Keep idempotency key stable for one checkout attempt.
- Do not contain order business logic.
- Do not contain secrets.
==================================================
*/

const OrderClient = (() => {

    /*
    Core endpoint is intentionally public configuration.
    No API secret belongs in the browser.
    */
    const CORE_API_URL =
        typeof Config !== "undefined" && Config.coreOrderApiUrl
            ? Config.coreOrderApiUrl
            : "";

    const IDEMPOTENCY_KEY_STORAGE =
        "previa_checkout_idempotency_key_v1";

    function createIdempotencyKey() {

        if (
            typeof crypto !== "undefined" &&
            typeof crypto.randomUUID === "function"
        ) {
            return crypto.randomUUID();
        }

        const timestamp = Date.now().toString(36);
        const random = Math.random().toString(36).slice(2);

        return `checkout-${timestamp}-${random}`;

    }

    function getOrCreateIdempotencyKey() {

        let key = null;

        try {
            key = sessionStorage.getItem(
                IDEMPOTENCY_KEY_STORAGE
            );
        } catch (error) {
            console.warn(
                "OrderClient: sessionStorage is unavailable.",
                error
            );
        }

        if (key) {
            return key;
        }

        key = createIdempotencyKey();

        try {
            sessionStorage.setItem(
                IDEMPOTENCY_KEY_STORAGE,
                key
            );
        } catch (error) {
            console.warn(
                "OrderClient: could not persist idempotency key.",
                error
            );
        }

        return key;

    }

    function resetCheckoutAttempt() {

        try {
            sessionStorage.removeItem(
                IDEMPOTENCY_KEY_STORAGE
            );
        } catch (error) {
            console.warn(
                "OrderClient: could not reset idempotency key.",
                error
            );
        }

    }

    function getTelegramInitData() {

        if (
            typeof Telegram === "undefined" ||
            !Telegram.WebApp
        ) {
            throw new Error(
                "Telegram WebApp is unavailable."
            );
        }

        const initData =
            Telegram.WebApp.initData;

        if (!initData) {
            throw new Error(
                "Telegram authorization data is unavailable."
            );
        }

        return initData;

    }

    function normalizeOrderData(orderDraft) {

        return {

            telegram_init_data:
                getTelegramInitData(),

            idempotency_key:
                getOrCreateIdempotencyKey(),

            customer_name:
                String(orderDraft.customer_name || "").trim(),

            phone:
                String(orderDraft.phone || "").trim(),

            email:
                String(orderDraft.email || "").trim(),

            contact_preferences:
                Array.isArray(orderDraft.contact_preferences)
                    ? orderDraft.contact_preferences.slice()
                    : [],

            payment_method:
                String(orderDraft.payment_method || "").trim(),

            note:
                String(orderDraft.note || "").trim(),

            items:
                Array.isArray(orderDraft.items)
                    ? orderDraft.items.map(item => ({
                        sku: String(item.sku || "").trim(),
                        quantity: Number(item.quantity || 1)
                    }))
                    : []

        };

    }

    async function createOrder(orderDraft) {

        if (!CORE_API_URL) {
            throw new Error(
                "PREVIA Core Order API URL is not configured."
            );
        }

        const payload =
            normalizeOrderData(orderDraft || {});

        let response;

        try {

            response = await fetch(
                CORE_API_URL,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                }
            );

        } catch (error) {

            const networkError = new Error(
                "Не вдалося зв'язатися із сервером замовлень."
            );

            networkError.code = "NETWORK_ERROR";
            networkError.retryable = true;
            networkError.cause = error;

            throw networkError;

        }

        let result = null;

        try {
            result = await response.json();
        } catch (error) {
            result = null;
        }

        if (!response.ok) {

            const serverError = new Error(
                result?.error ||
                `Order API request failed: ${response.status}`
            );

            serverError.code =
                result?.code || "ORDER_API_ERROR";

            serverError.retryable =
                result?.retryable === true ||
                response.status >= 500;

            serverError.status = response.status;
            serverError.details = result?.details || [];

            throw serverError;

        }

        if (!result || result.success !== true) {

            const orderError = new Error(
                result?.error ||
                "Order API returned an unsuccessful response."
            );

            orderError.code =
                result?.code || "ORDER_API_ERROR";

            orderError.retryable =
                result?.retryable === true;

            orderError.details = result?.details || [];

            throw orderError;

        }

        return result;

    }

    return {
        createOrder,
        getOrCreateIdempotencyKey,
        resetCheckoutAttempt
    };

})();
