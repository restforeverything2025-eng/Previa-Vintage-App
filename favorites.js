/*
==================================================
PREVIA

favorites.js

Favorites Module

Responsibility:
- Manage favorite products.
- Provide the public Favorites API.
- Persist favorites using the current Storage Provider.

Current Storage Provider:
- Browser Local Storage
==================================================
*/

const Favorites = (() => {

    const FAVORITES_STORAGE_KEY = "previa-favorites";

    let favorites = [];

    function init() {

    favorites =
        StorageService.get(FAVORITES_STORAGE_KEY) || [];

    }

    function saveFavorites() {

    StorageService.set(
        FAVORITES_STORAGE_KEY,
        favorites
    );

    }

    function has(id) {
        return favorites.includes(id);
    }

    function toggle(id) {

        if (has(id)) {
            favorites = favorites.filter(item => item !== id);
        } else {
            favorites.push(id);
        }

        saveFavorites();
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
function toggleFavorite(productId, button, event) {

    if (event) {

        event.stopPropagation();

    }

    Favorites.toggle(productId);

    const isFavorite =
        Favorites.has(productId);

    button.classList.toggle(
        "active",
        isFavorite
    );

}