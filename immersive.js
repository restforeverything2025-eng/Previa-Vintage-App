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


    if (Identity.isAuthenticated()) {

    question.textContent =
        "Ви вже з нами ❤️";

    connectButton.style.display =
        "none";

    closeButton.textContent =
        "OK";

} else {

    question.textContent =
        "Погрузитися?";

    connectButton.style.display =
        "block";

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

async function enterCustomerPlatform() {

    if (Identity.isAuthenticated()) {

        showImmerse();

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
