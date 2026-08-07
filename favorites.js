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

    async function init() {

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

        favorites =
            await provider.getAll(
                customerId
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

}

    function has(id) {
        return favorites.includes(id);
    }

    async function toggle(id) {

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
        count
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

    await Favorites.toggle(productId);

    const isFavorite =
        Favorites.has(productId);

    button.classList.toggle(
        "active",
        isFavorite
    );

}