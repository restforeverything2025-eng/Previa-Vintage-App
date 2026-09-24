/*
==================================================
PREVIA

CustomerClient.js

Customer Client

Responsibility:
- Communicate with PREVIA Core Customer API.
- Send authenticated Customer requests to Core.
- Return Customer data to the Frontend.
- Do not contain business logic.
==================================================
*/

const CustomerClient = (() => {

    const API_URL =
        Config.coreCustomerApiUrl;

    async function request(action, authentication) {

        const response =
            await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json;charset=UTF-8"
                },

                body: JSON.stringify({
                    action,
                    ...authentication
                })

            });

        if (!response.ok) {

            throw new Error(
                "Customer API request failed: " +
                response.status
            );

        }

        const result =
            await response.json();

        if (!result.success) {

            const error = new Error(
                result.message ||
                result.error ||
                "Customer API returned an error."
            );

            error.code = result.code;
            error.retryable = result.retryable;

            throw error;

        }

        return result;

    }

    async function getOrCreateCustomerTelegramOidc(
        idToken,
        nonce = null
    ) {

        const authentication = {
            telegram_id_token: idToken
        };

        if (typeof nonce === "string" && nonce.trim()) {
            authentication.telegram_oidc_nonce = nonce;
        }

        const result = await request(
            "customer.getOrCreate",
            authentication
        );

        return result;

    }

    async function findCustomerTelegramOidc(
        idToken,
        nonce = null
    ) {

        const authentication = {
            telegram_id_token: idToken
        };

        if (typeof nonce === "string" && nonce.trim()) {
            authentication.telegram_oidc_nonce = nonce;
        }

        const result = await request(
            "customer.find",
            authentication
        );

        return result;

    }

    async function findCustomerWebSession(sessionToken) {

        const result = await request(
            "customer.find",
            { telegram_session_token: sessionToken }
        );

        return result;

    }

    async function getOrCreateCustomerMiniApp(initData) {

        const result =
            await request(
                "customer.getOrCreate",
                { telegram_init_data: initData }
            );

        return result;

    }

    async function findCustomerMiniApp(initData) {

        const result =
            await request(
                "customer.find",
                { telegram_init_data: initData }
            );

        return result;

    }

    return {
        getOrCreateCustomerTelegramOidc,
        findCustomerTelegramOidc,
        findCustomerWebSession,
        getOrCreateCustomerMiniApp,
        findCustomerMiniApp
    };

})();
