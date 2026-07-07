/* =========================================
   Navigation
========================================= */

let currentView = "home";
let navigationSource = "home";

function setNavigationSource(source) {

    navigationSource = source;

}

function getNavigationSource() {

    return navigationSource;

}

function updateNavigation() {

    const backButton = document.getElementById("backBtn");

    if (!backButton) return;

    if (currentView === "home") {

        backButton.style.display = "none";

    } else {

        backButton.style.display = "block";

    }

}

function handleBackButton() {

    if (currentView === "search") {

        Search.clearSearch();

        goHome();

        return;

    }

    goBack();

}

function goBack() {

    if (currentView === "product") {

        switch (getNavigationSource()) {

            case "search":
                goHome();
                return;

            case "category":
                currentCategory();
                return;

            case "favorites":
                currentCategory();
                return;

            default:
                currentCategory();
                return;

        }

    }

    if (currentView === "category") {

        goHome();
        return;

    }

    if (currentView === "favorites") {

    goHome();
    return;

}

}