/*
PREVIA

favorites-client.js

Favorites Client

Responsibility:

- Communicate with PREVIA Core Favorites API.
- Send authenticated Favorites requests to Core.
- Return Favorites data to Frontend.
- Do not contain business logic.
==================================================
*/

const FavoritesClient = (() => {

    const API_URL =
        Config.coreFavoritesApiUrl;

    async function request(action, authentication, data = {}) {

        const response =
            await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json;charset=UTF-8"
                },

                body: JSON.stringify({
                    action,
                    ...authentication,
                    ...data
                })

            });

        if (!response.ok) {

            throw new Error(
                "Favorites API request failed: " +
                response.status
            );

        }

        const result =
            await response.json();

        if (!result.success) {

            const error = new Error(
                result.message ||
                result.error ||
                "Favorites API returned an error."
            );

            error.code = result.code;
            error.retryable = result.retryable;

            throw error;

        }

        return result;

    }

    function authenticationFromIdentity() {

        const authentication =
            TelegramBridge.getAuthentication();

        if (!authentication) {

            throw new Error(
                "Telegram authentication is required for cloud favorites."
            );

        }

        return authentication;

    }

    async function getFavorites() {

        const result =
            await request(
                "favorites.get",
                authenticationFromIdentity()
            );

        return result.favorites;

    }

    async function addFavorite(productId) {

        const result =
            await request(
                "favorites.add",
                authenticationFromIdentity(),
                { productId }
            );

        return result.favorite;

    }

    async function removeFavorite(productId) {

        const result =
            await request(
                "favorites.remove",
                authenticationFromIdentity(),
                { productId }
            );

        return result.removed;

    }

    return {
        getFavorites,
        addFavorite,
        removeFavorite
    };

})();