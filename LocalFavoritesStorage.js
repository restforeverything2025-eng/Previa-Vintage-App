/*
PREVIA

LocalFavoritesStorage.js

Local Favorites Storage

Responsibility:

- Implement FavoritesStorage using Browser Local Storage.
- Store favorite product IDs locally.
- Remain independent from Favorites business logic.

This is the guest Favorites storage implementation.
*/

const LocalFavoritesStorage = (() => {

    const STORAGE_KEY = "previa-favorites";

    function getAll() {

        const favorites =
            localStorage.getItem(STORAGE_KEY);

        if (!favorites) {

            return [];

        }

        try {

            const parsed =
                JSON.parse(favorites);

            return Array.isArray(parsed)
                ? parsed
                : [];

        } catch (error) {

            console.error(
                "Failed to read local favorites:",
                error
            );

            return [];

        }

    }

    function add(
        customerId,
        productId
    ) {

        const favorites =
            getAll();

        if (
            favorites.includes(productId)
        ) {

            return;

        }

        favorites.push(productId);

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(favorites)
        );

    }

    function remove(
        customerId,
        productId
    ) {

        const favorites =
            getAll();

        const updatedFavorites =
            favorites.filter(
                id => id !== productId
            );

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(updatedFavorites)
        );

    }

    return {

        getAll,
        add,
        remove

    };

})();

