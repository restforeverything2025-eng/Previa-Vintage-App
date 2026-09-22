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

function renderTelegramLoginWidget() {

    const container =
        document.getElementById("telegram-login-container");

    if (!container) {
        throw new Error("Telegram login container is unavailable.");
    }

    container.innerHTML = "";
    container.classList.remove("hidden");
    container.style.display = "block";

    const script =
        document.createElement("script");

    script.async = true;
    script.src =
        "https://telegram.org/js/telegram-widget.js?22";

    script.dataset.telegramLogin =
        Config.telegramLoginBotUsername;

    script.dataset.size = "large";
    script.dataset.onauth = "handleTelegramLogin(user)";

    container.appendChild(script);

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

        renderTelegramLoginWidget();

    } catch (error) {

        console.error(
            "Telegram Login Widget initialization failed:",
            error
        );

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
