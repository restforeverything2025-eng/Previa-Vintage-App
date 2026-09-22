/*
==================================================
PREVIA

telegram-bridge.js

Telegram Bridge

Responsibility:

- Communicate with Telegram authentication surfaces.
- Convert verified Telegram data into PREVIA Identity.
- Never contain business logic.
==================================================
*/

const TelegramBridge = (() => {

    const WEB_OIDC_STORAGE_KEY =
        "previa-telegram-oidc";

    let authentication = null;

    function getMiniApp() {

        if (
            typeof Telegram === "undefined" ||
            !Telegram.WebApp
        ) {

            return null;

        }

        return Telegram.WebApp;

    }

    function setIdentityFromCustomer(customer) {

        const identity =
            Customer.create({

                customerId:
                    customer.customerId,

                provider:
                    customer.provider,

                id:
                    customer.providerId,

                name:
                    customer.displayName

            });

        Identity.setCurrent(identity);

        return identity;

    }

    function setWebOidcAuthentication(idToken) {

        if (
            typeof idToken !== "string" ||
            !idToken.trim()
        ) {

            throw new Error(
                "Telegram OIDC ID token is invalid."
            );

        }

        authentication = {
            telegram_id_token: idToken
        };

        try {
            sessionStorage.setItem(
                WEB_OIDC_STORAGE_KEY,
                idToken
            );
        } catch {
            // Session persistence is optional; in-memory auth remains active.
        }

        return authentication;

    }

    function restoreWebOidcAuthentication() {

        if (authentication) {
            return authentication.telegram_id_token || null;
        }

        try {
            const idToken =
                sessionStorage.getItem(WEB_OIDC_STORAGE_KEY);

            if (
                typeof idToken !== "string" ||
                !idToken.trim()
            ) {
                return null;
            }

            authentication = {
                telegram_id_token: idToken
            };

            return idToken;

        } catch {
            return null;
        }

    }

    function restoreWebOidcNonce() {

        try {
            const key =
                Config.telegramOidcNonceStorageKey;

            if (!key) {
                return null;
            }

            const nonce =
                sessionStorage.getItem(key);

            if (
                typeof nonce !== "string" ||
                !nonce.trim()
            ) {
                return null;
            }

            return nonce;

        } catch {
            return null;
        }

    }

    function clearWebOidcNonce() {

        try {
            const key =
                Config.telegramOidcNonceStorageKey;

            if (key) {
                sessionStorage.removeItem(key);
            }
        } catch {
            // Ignore storage failures.
        }

    }

    function isMiniApp() {
        const webApp = getMiniApp();
        return Boolean(webApp && webApp.initData);
    }

    async function connect() {

        const webApp = getMiniApp();

        if (!webApp || !webApp.initData) {

            throw new Error(
                "Telegram Mini App authentication is unavailable."
            );

        }

        const user =
            webApp.initDataUnsafe.user;

        if (!user) {

            throw new Error(
                "Telegram user data is unavailable."
            );

        }

        const customer =
            await CustomerClient.getOrCreateCustomerMiniApp(
                webApp.initData
            );

        authentication = {
            telegram_init_data: webApp.initData
        };

        const identity =
            setIdentityFromCustomer(customer);

        console.log(
            "Telegram Mini App connected."
        );

        return identity;

    }

    async function restore() {

        const webApp = getMiniApp();

        if (webApp && webApp.initData) {

            const customer =
                await CustomerClient.findCustomerMiniApp(
                    webApp.initData
                );

            if (!customer) {
                return null;
            }

            authentication = {
                telegram_init_data: webApp.initData
            };

            const identity =
                setIdentityFromCustomer(customer);

            console.log(
                "Existing Telegram Mini App Customer restored."
            );

            return identity;

        }

        const idToken =
            restoreWebOidcAuthentication();

        if (!idToken) {
            return null;
        }

        const nonce =
            restoreWebOidcNonce();

        try {

            const customer =
                await CustomerClient.findCustomerTelegramOidc(
                    idToken,
                    nonce
                );

            if (!customer) {
                authentication = null;
                return null;
            }

            const identity =
                setIdentityFromCustomer(customer);

            console.log(
                "Existing Web Customer restored."
            );

            clearWebOidcNonce();

            return identity;

        } catch (error) {

            authentication = null;

            try {
                sessionStorage.removeItem(
                    WEB_OIDC_STORAGE_KEY
                );
            } catch {
                // Ignore storage failures.
            }

            clearWebOidcNonce();

            throw error;

        }

    }

    async function connectWeb(idToken, nonce = null) {

        const effectiveNonce =
            typeof nonce === "string" && nonce.trim()
                ? nonce
                : restoreWebOidcNonce();

        try {

            const customer =
                await CustomerClient.getOrCreateCustomerTelegramOidc(
                    idToken,
                    effectiveNonce
                );

            setWebOidcAuthentication(idToken);

            const identity =
                setIdentityFromCustomer(customer);

            console.log(
                "Telegram Web OIDC login connected."
            );

            return identity;

        } finally {
            clearWebOidcNonce();
        }

    }

    function getAuthentication() {

        if (authentication) {
            return authentication;
        }

        const idToken =
            restoreWebOidcAuthentication();

        if (idToken) {
            return {
                telegram_id_token: idToken
            };
        }

        const webApp = getMiniApp();

        if (webApp && webApp.initData) {
            return {
                telegram_init_data: webApp.initData
            };
        }

        return null;

    }

    function isTelegramMiniApp() {
        return isMiniApp();
    }

    function clear() {

        authentication = null;
        Identity.clear();

        try {
            sessionStorage.removeItem(
                WEB_OIDC_STORAGE_KEY
            );
        } catch {
            // Ignore storage failures.
        }

        clearWebOidcNonce();

    }

    return {
        connect,
        connectWeb,
        restore,
        getAuthentication,
        isTelegramMiniApp,
        clear
    };

})();

/*
Global callback required by the Telegram OIDC Login Library.
The library invokes this function with an authentication result object.
*/
window.handleTelegramLogin = async function(result) {

    if (!result || result.error) {

        console.error(
            "Telegram Web OIDC authentication failed:",
            result?.error || "Empty authentication result."
        );

        if (typeof showToast === "function") {
            showToast(
                "Не вдалося підключити Telegram. Спробуйте ще раз."
            );
        }

        return;

    }

    if (typeof result.id_token !== "string" || !result.id_token.trim()) {

        console.error(
            "Telegram Web OIDC authentication failed:",
            "ID token is missing."
        );

        if (typeof showToast === "function") {
            showToast(
                "Telegram не повернув дані авторизації. Спробуйте ще раз."
            );
        }

        return;

    }

    try {

        const nonce =
            restoreWebOidcNonce();

        await TelegramBridge.connectWeb(
            result.id_token,
            nonce
        );
        await Favorites.init();

        if (typeof showImmerse === "function") {
            showImmerse();
        }

        if (typeof closeImmerse === "function") {
            closeImmerse();
        }

        console.log(
            "Telegram Web OIDC authentication completed."
        );

    } catch (error) {

        console.error(
            "Telegram Web OIDC authentication failed:",
            error
        );

        if (typeof showToast === "function") {
            showToast(
                "Не вдалося підключити Telegram. Спробуйте ще раз."
            );
        }

    }

};