/*
==================================================
PREVIA

favorites.js

Favorites Module

Responsibility:
- Manage favorite products.
- Provide the public Favorites API.
- Persist favorites using the current Storage Provider.

Storage Provider:

Selected by FavoritesStorageManager

- CloudFavoritesStorage
- LocalFavoritesStorage
==================================================
*/

const Favorites = (() => {

    const FAVORITES_STORAGE_KEY = "previa-favorites";

    let favorites = [];

    let state = "idle";
    let initializationPromise = null;

    async function init() {

    if (initializationPromise) {

        return initializationPromise;

    }

    state = "loading";

    initializationPromise = (async () => {

    const provider =
        FavoritesStorageManager.getProvider();

    const customerId =
        FavoritesStorageManager.getCustomerId();

    /*
    =========================================
    Cloud Storage
    =========================================
    */

    if (
        provider === CloudFavoritesStorage &&
        customerId
    ) {

        const records =
            await provider.getAll(
            customerId
        );

        favorites =
            records.map(
            record => record.productId
        );

    return;

    }


    /*
    =========================================
    Local Storage
    =========================================
    */

    favorites =
        await provider.getAll();

    state = "ready";

    })();

    try {

        await initializationPromise;

    } catch (error) {

        state = "error";

        throw error;

    } finally {

        initializationPromise = null;

    }

}

    function has(id) {
        return favorites.includes(id);
    }

    function getState() {
        return state;
    }

    function isReady() {
        return state === "ready";
    }

    function waitUntilReady() {

        if (state === "ready") {

            return Promise.resolve();

        }

        if (initializationPromise) {

            return initializationPromise;

        }

        return Promise.reject(
            new Error("Favorites has not been initialized.")
        );

    }

    async function toggle(id) {

    if (!isReady()) {

        throw new Error(
            "Favorites is not ready."
        );

    }

    const provider =
        FavoritesStorageManager.getProvider();

    const customerId =
        FavoritesStorageManager.getCustomerId();


    /*
    =========================================
    Cloud Storage
    =========================================
    */

    if (
        provider === CloudFavoritesStorage &&
        customerId
    ) {

        if (has(id)) {

    await provider.remove(
        customerId,
        id
    );

    favorites =
        favorites.filter(
            item => item !== id
        );

} 
        
        else {

            await provider.add(
                customerId,
                id
            );

            favorites.push(id);

        }

        return;

    }


    /*
    =========================================
    Local Storage
    =========================================
    */

    if (has(id)) {

        favorites =
            favorites.filter(
                item => item !== id
            );

        await provider.remove(
            null,
            id
        );

    } else {

        await provider.add(
            null,
            id
        );

        favorites.push(id);

    }

}

    function getAll() {
        return [...favorites];
    }

    function count() {
        return favorites.length;
    }
/*
==================================================
Public API
==================================================
*/
    return {
        init,
        toggle,
        has,
        getAll,
        count,
        getState,
        isReady,
        waitUntilReady
    };

})();
/*
==================================================
Favorites UI Helpers

These helpers connect the Favorites API
with the browser user interface.

They are not part of the Favorites business API.
==================================================
*/
async function toggleFavorite(productId, button, event) {

    if (event) {

        event.stopPropagation();

    }

    if (!Favorites.isReady()) {

        console.warn(
            "Favorite action ignored: Favorites is not ready yet."
        );

        return;

    }

    await Favorites.toggle(productId);

    const isFavorite =
        Favorites.has(productId);

    button.classList.toggle(
        "active",
        isFavorite
    );

}

function refreshFavoriteUI() {

    if (!Favorites.isReady()) {

        return;

    }

    document
        .querySelectorAll("[data-favorite-product]")
        .forEach(button => {

            const productId =
                button.dataset.favoriteProduct;

            const isFavorite =
                Favorites.has(productId);

            button.classList.toggle(
                "active",
                isFavorite
            );

            button.setAttribute(
                "aria-pressed",
                String(isFavorite)
            );

        });

    if (
        typeof currentView !== "undefined" &&
        currentView === "favorites" &&
        typeof refreshFavoritesViewAfterReady === "function"
    ) {

        refreshFavoritesViewAfterReady();

    }

}
