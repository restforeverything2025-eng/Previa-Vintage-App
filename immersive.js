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

    if (Identity.isAuthenticated()) {

        alert(
            "Customer Panel буде доступна незабаром."
        );

        return;

    }

    document
        .getElementById("immerse-modal")
        .classList
        .remove("hidden");

}


function closeImmerse() {

    document
        .getElementById("immerse-modal")
        .classList
        .add("hidden");

}


async function enterCustomerPlatform() {

    if (Identity.isAuthenticated()) {

        alert(
            "Customer Panel буде доступна незабаром."
        );

        return;

    }

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
