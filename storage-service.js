/*
==================================================
PREVIA

storage-service.js

Storage Service

Responsibility:
- Provide unified access to storage.
- Select the active Storage Provider.
==================================================
*/

const StorageService = (() => {

    function getProvider() {

        if (Identity.isAuthenticated()) {

            return LocalStorageProvider;

        }

        return LocalStorageProvider;

    }

    return {

        get(key) {

            return getProvider().get(key);

        },

        set(key, value) {

            getProvider().set(key, value);

        },

        remove(key) {

            getProvider().remove(key);

        },

        clear() {

            getProvider().clear();

        }

    };

})();