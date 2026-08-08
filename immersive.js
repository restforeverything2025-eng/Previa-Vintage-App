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

    const status =
        document.querySelector(
            ".immerse-coming-soon"
        );


    if (Identity.isAuthenticated()) {

        connectButton.style.display =
            "none";

        status.textContent =
            "Ви вже з нами ❤️";

        status.style.color =
            "#d4af37";

        status.style.fontWeight =
            "600";

    } else {

        connectButton.style.display =
            "block";

        status.textContent =
            "Незабаром";

        status.style.color =
            "";

        status.style.fontWeight =
            "";

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
