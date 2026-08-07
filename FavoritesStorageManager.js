/*
PREVIA

FavoritesStorageManager.js

Favorites Storage Manager

Responsibility:

- Select the active Favorites Storage Provider.
- Use Identity to determine authentication state.
- Keep provider selection outside Favorites business logic.
- Do not contain Favorites business logic.
- Do not communicate with APIs directly.
*/

const FavoritesStorageManager = (() => {

    function getProvider() {

        if (Identity.isAuthenticated()) {

            return CloudFavoritesStorage;

        }

        return LocalFavoritesStorage;

    }

    function getCustomerId() {

        const identity =
            Identity.getCurrent();

        if (!identity) {

            return null;

        }

        return identity.id;

    }

    return {

        getProvider,

        getCustomerId

    };

})();