/*
PREVIA

FavoritesStorage.js

Favorites Storage Contract

Responsibility:

- Define the storage interface for Favorites.
- Describe operations required by Favorites.
- Remain independent from the actual storage implementation.

Implementations may use:

- Browser Local Storage
- Cloud API
- Future storage systems

This file contains no storage implementation.
*/

const FavoritesStorage = {

    getAll(customerId) {

        throw new Error(
            "FavoritesStorage.getAll() is not implemented."
        );

    },

    add(customerId, productId) {

        throw new Error(
            "FavoritesStorage.add() is not implemented."
        );

    },

    remove(customerId, productId) {

        throw new Error(
            "FavoritesStorage.remove() is not implemented."
        );

    }

};