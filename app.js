/* =========================================
   Product State
========================================= */

let currentProduct = null;
let currentCategory = null;

let currentImages = [];
let currentImageIndex = 0;

/* =========================================
   Touch Navigation
========================================= */

let touchStartX = 0;
let touchEndX = 0;

function scrollToTop() {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

function scrollToCatalog() {

    document.getElementById(
        "search-container"
    ).scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}

document.addEventListener("keydown", function(event){

    const lightbox =
        document.getElementById("lightbox");

    if(lightbox.style.display !== "flex"){

        return;

    }

    if(event.key === "Escape"){

        closeLightbox();

    }

    if(event.key === "ArrowLeft"){

    previousImage();

}

if(event.key === "ArrowRight"){

    nextImage();

}

});

window.addEventListener("scroll", function() {

    const button = document.getElementById("scrollTopBtn");

    if(window.scrollY > 300) {

        button.style.display = "flex";

    } else {

        button.style.display = "none";

    }

});

/* =========================================
Application Initialization
========================================= */

async function initializePersonalizationFavorites(reinitialize = false) {

    try {

        if (
            reinitialize &&
            typeof Favorites.reinitialize === "function"
        ) {

            await Favorites.reinitialize();

        } else {

            await Favorites.init();

        }

        refreshFavoriteUI();

        console.log(
            "Favorites initialized."
        );

        return true;

    } catch (error) {

        console.error(
            "Favorites initialization failed:",
            error
        );

        return false;

    }

}

async function initializePersonalization() {

    try {

        const identity =
            await TelegramBridge.restore();

        if (identity) {

            console.log(
                "Existing Identity restored:",
                identity
            );

        } else {

            console.log(
                "No existing Customer found."
            );

        }

    } catch (error) {

        console.error(
            "Identity restoration failed:",
            error
        );

        Identity.clear();

    }

    return initializePersonalizationFavorites();

}

function initializeStaticUI() {

    document.getElementById("backBtn").innerHTML =
        Icons.getBack();

    document.getElementById("scrollTopBtn").innerHTML =
        Icons.getUp();

    document.getElementById("lightboxPrev").innerHTML =
        Icons.getBack();

    document.getElementById("lightboxNext").innerHTML =
        Icons.getNext();

    document.getElementById("lightboxClose").innerHTML =
        Icons.getClose();

}

function initializeInitialRoute() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const productId =
        params.get("product");

    if (productId) {

        showProduct(productId);

    }

}

function initializeApplication() {

    Theme.init();
    DailyInfo.init();

    initializeStaticUI();

    initializeHome();

    TelegramBridge.ready();

    initializeInitialRoute();

    console.log(
        "PREVIA UI_READY."
    );

    void initializePersonalization();

}

initializeApplication();

/*
==================================================
PREVIA Startup Diagnostics

Read-only console helpers for local verification.
They do not mutate Identity, Favorites, or storage.
==================================================
*/

window.testPreviaStartup = function() {

    const result = {

        uiReady: true,

        favoritesState:
            Favorites.getState(),

        favoritesReady:
            Favorites.isReady(),

        identityAuthenticated:
            Identity.isAuthenticated(),

        telegramMiniApp:
            TelegramBridge.isTelegramMiniApp(),

        scrollHeight:
            document.documentElement.scrollHeight,

        viewportHeight:
            window.innerHeight,

        scrollable:
            document.documentElement.scrollHeight >
            window.innerHeight

    };

    console.table(result);

    return result;

};

window.testFavoritesReadiness = function() {

    const result = {

        state:
            Favorites.getState(),

        ready:
            Favorites.isReady(),

        count:
            Favorites.count(),

        authenticated:
            Identity.isAuthenticated()

    };

    console.table(result);

    return result;

};
