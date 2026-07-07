/*
==================================================
PREVIA

favorites.js

Favorites Module

Responsibility:
- Manage favorite products
- Store favorites in Local Storage
- Add / Remove favorites
- Check favorite status
==================================================
*/

const Favorites = (() => {

    const STORAGE_KEY = "previa-favorites";

    let favorites = [];

    function init() {
        try {
            favorites = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        } catch {
            favorites = [];
        }
    }

    function save() {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
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

        save();
    }

    function getAll() {
        return [...favorites];
    }

    function count() {
        return favorites.length;
    }

    return {
        init,
        toggle,
        has,
        getAll,
        count
    };

})();

function toggleFavorite(productId, button, event) {

    if (event) {

        event.stopPropagation();

    }

    Favorites.toggle(productId);

    button.textContent =
        Favorites.has(productId) ? "♥" : "♡";

}