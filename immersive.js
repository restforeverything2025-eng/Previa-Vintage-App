/*
PREVIA

immersive.js

Customer Platform Entry

Responsibility:

- Show Immerse information.
- Prepare Customer Platform entry point.
- Start Customer Platform authentication only
  after explicit customer consent.
==================================================
*/

let telegramLoginLibraryPromise = null;

function showImmerse() {

    const modal =
        document.getElementById("immerse-modal");

    const connectButton =
        document.querySelector(
            ".immerse-connect-btn"
        );

    const closeButton =
        document.querySelector(
            ".immerse-close-btn"
        );

    const question =
        document.querySelector(
            ".immerse-question"
        );

    const loginContainer =
        document.getElementById("telegram-login-container");

    if (Identity.isAuthenticated()) {

        question.textContent =
            "Ви вже з нами ❤️";

        connectButton.style.display =
            "none";

        if (loginContainer) {
            loginContainer.classList.add("hidden");
            loginContainer.style.display = "none";
        }

        closeButton.textContent =
            "OK";

    } else {

        question.textContent =
            "Поринути?";

        connectButton.style.display =
            "block";

        if (loginContainer) {
            loginContainer.classList.add("hidden");
            loginContainer.style.display = "none";
            loginContainer.innerHTML = "";
        }

        closeButton.textContent =
            "НІ";

    }

    modal
        .classList
        .remove("hidden");

}

function closeImmerse() {

    document
        .getElementById("immerse-modal")
        .classList
        .add("hidden");

}

function loadTelegramLoginLibrary() {

    if (
        typeof Telegram !== "undefined" &&
        Telegram.Login &&
        typeof Telegram.Login.init === "function"
    ) {
        return Promise.resolve();
    }

    if (telegramLoginLibraryPromise) {
        return telegramLoginLibraryPromise;
    }

    telegramLoginLibraryPromise = new Promise(
        (resolve, reject) => {

            const existingScript =
                document.querySelector(
                    'script[data-previa-telegram-login="true"]'
                );

            if (existingScript) {

                existingScript.addEventListener(
                    "load",
                    () => resolve()
                );

                existingScript.addEventListener(
                    "error",
                    () => reject(
                        new Error(
                            "Telegram Login library failed to load."
                        )
                    )
                );

                return;

            }

            const script =
                document.createElement("script");

            script.async = true;
            script.src =
                "https://telegram.org/js/telegram-login.js";
            script.dataset.previaTelegramLogin = "true";

            script.addEventListener(
                "load",
                () => resolve()
            );

            script.addEventListener(
                "error",
                () => reject(
                    new Error(
                        "Telegram Login library failed to load."
                    )
                )
            );

            document.head.appendChild(script);

        }
    );

    return telegramLoginLibraryPromise;

}

async function openTelegramLogin() {

    await loadTelegramLoginLibrary();

    if (
        typeof Telegram === "undefined" ||
        !Telegram.Login ||
        typeof Telegram.Login.open !== "function" ||
        typeof Telegram.Login.init !== "function"
    ) {
        throw new Error(
            "Telegram Login library is unavailable."
        );
    }

    Telegram.Login.init(
        {
            client_id: Number(
                Config.telegramOidcClientId
            )
        },
        window.handleTelegramLogin
    );

    Telegram.Login.open(
        window.handleTelegramLogin
    );

}

async function enterCustomerPlatform() {

    if (Identity.isAuthenticated()) {

        showImmerse();

        return;

    }

    if (TelegramBridge.isTelegramMiniApp()) {

        try {

            const identity =
                await TelegramBridge.connect();

            console.log(
                "Customer Platform entered:",
                identity
            );

            await Favorites.init();

            console.log(
                "Cloud Favorites initialized."
            );

            closeImmerse();

        } catch (error) {

            console.error(
                "Customer Platform entry failed:",
                error
            );

        }

        return;

    }

    try {

        await openTelegramLogin();

    } catch (error) {

        console.error(
            "Telegram OIDC Login initialization failed:",
            error
        );

        if (typeof showToast === "function") {
            showToast(
                "Не вдалося відкрити Telegram. Спробуйте ще раз."
            );
        }

    }

}

function initializeImmerse() {

    const modal =
        document.getElementById("immerse-modal");

    modal.addEventListener(
        "click",
        function(event) {

            if (event.target === modal) {

                closeImmerse();

            }

        }
    );

}

document.addEventListener(
    "DOMContentLoaded",
    initializeImmerse
);
