/*
PREVIA

favorites-client.js

Favorites Client

Responsibility:

- Communicate with PREVIA CMS Favorites API.
- Send Favorites requests to Backend.
- Return Favorites data to Frontend.
- Do not contain business logic.
==================================================
*/

const FavoritesClient = (() => {

    const API_URL =
        "https://script.google.com/macros/s/AKfycbxWHGxRB3Edb5_cMZocgqswx7I_y4KKCb67RwTVYBMoqoTCvLTTXXOmsmGw9af3i2I8Fg/exec";


    async function request(action, data) {

        const response =
            await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type":
                        "text/plain;charset=UTF-8"
                },

                body: JSON.stringify({

                    action,

                    data

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

            throw new Error(
                result.error ||
                "Favorites API returned an error."
            );

        }


        return result;

    }


    async function getFavorites(customerId) {

        const result =
            await request(

                "favorites.get",

                {
                    customerId
                }

            );

        return result.favorites;

    }


    async function addFavorite(
        customerId,
        productId
    ) {

        const result =
            await request(

                "favorites.add",

                {
                    customerId,
                    productId
                }

            );

        return result.favorite;

    }


    async function removeFavorite(
        customerId,
        productId
    ) {

        const result =
            await request(

                "favorites.remove",

                {
                    customerId,
                    productId
                }

            );

        return result.removed;

    }


    return {

        getFavorites,

        addFavorite,

        removeFavorite

    };

})();