/*
==================================================
PREVIA

immersive.js

Customer Platform Entry

Responsibility:
- Show Immerse information.
- Prepare Customer Platform entry point.
==================================================
*/

function showImmerse() {

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

function connectTelegram() {

    alert("Підключення Telegram буде доступне незабаром.");

}

function initializeImmerse() {

    const modal =
        document.getElementById("immerse-modal");

    modal.addEventListener("click", function(event){

        if(event.target === modal){

            closeImmerse();

        }

    });

}document.addEventListener(
    "DOMContentLoaded",
    initializeImmerse
);