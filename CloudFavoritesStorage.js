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

    async function getAll(customerId) {

        return FavoritesClient.getFavorites(
            customerId
        );

    }

    async function add(
        customerId,
        productId
    ) {

        return FavoritesClient.addFavorite(
            customerId,
            productId
        );

    }

    async function remove(
        customerId,
        productId
    ) {

        return FavoritesClient.removeFavorite(
            customerId,
            productId
        );

    }

    return {

        getAll,
        add,
        remove

    };

})();