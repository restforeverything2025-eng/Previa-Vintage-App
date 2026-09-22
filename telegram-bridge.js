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

    const WEB_LOGIN_STORAGE_KEY =
        "previa-telegram-login";

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

    function setWebLoginAuthentication(loginData) {

        if (
            !loginData ||
            loginData.id === undefined ||
            !loginData.hash ||
            !loginData.auth_date
        ) {

            throw new Error(
                "Telegram Login data is invalid."
            );

        }

        authentication = {
            telegram_login: {
                ...loginData
            }
        };

        try {
            sessionStorage.setItem(
                WEB_LOGIN_STORAGE_KEY,
                JSON.stringify(loginData)
            );
        } catch {
            // Session persistence is optional; in-memory auth remains active.
        }

        return authentication;

    }

    function restoreWebLoginAuthentication() {

        if (authentication) {
            return authentication.telegram_login || null;
        }

        try {
            const raw =
                sessionStorage.getItem(WEB_LOGIN_STORAGE_KEY);

            if (!raw) {
                return null;
            }

            const loginData = JSON.parse(raw);

            if (!loginData || typeof loginData !== "object") {
                return null;
            }

            authentication = {
                telegram_login: loginData
            };

            return loginData;

        } catch {
            return null;
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

        const loginData =
            restoreWebLoginAuthentication();

        if (!loginData) {
            return null;
        }

        const customer =
            await CustomerClient.findCustomerTelegramLogin(
                loginData
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

        return identity;

    }

    async function connectWeb(loginData) {

        const customer =
            await CustomerClient.getOrCreateCustomerTelegramLogin(
                loginData
            );

        setWebLoginAuthentication(loginData);

        const identity =
            setIdentityFromCustomer(customer);

        console.log(
            "Telegram Web login connected."
        );

        return identity;

    }

    function getAuthentication() {

        if (authentication) {
            return authentication;
        }

        const loginData =
            restoreWebLoginAuthentication();

        if (loginData) {
            return {
                telegram_login: loginData
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
                WEB_LOGIN_STORAGE_KEY
            );
        } catch {
            // Ignore storage failures.
        }

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
Global callback required by the Telegram Login Widget.
The widget invokes this function after successful authentication.
*/
window.handleTelegramLogin = async function(loginData) {

    try {

        await TelegramBridge.connectWeb(loginData);
        await Favorites.init();

        if (typeof showImmerse === "function") {
            showImmerse();
        }

        if (typeof closeImmerse === "function") {
            closeImmerse();
        }

        console.log(
            "Telegram Web authentication completed."
        );

    } catch (error) {

        console.error(
            "Telegram Web authentication failed:",
            error
        );

        if (typeof showToast === "function") {
            showToast(
                "Не вдалося підключити Telegram. Спробуйте ще раз."
            );
        }

    }

};