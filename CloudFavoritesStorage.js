/*
PREVIA

CloudFavoritesStorage.js

Cloud Favorites Storage

Responsibility:

- Implement FavoritesStorage using the PREVIA Cloud API.
- Communicate with FavoritesClient.
- Remain independent from Favorites business logic.

This is the authenticated Favorites storage implementation.
*/

const CloudFavoritesStorage = (() => {

    async function getAll() {

        return FavoritesClient.getFavorites();

    }

    async function add(
        _customerId,
        productId
    ) {

        return FavoritesClient.addFavorite(
            productId
        );

    }

    async function remove(
        _customerId,
        productId
    ) {

        return FavoritesClient.removeFavorite(
            productId
        );

    }

    return {

        getAll,
        add,
        remove

    };

})();