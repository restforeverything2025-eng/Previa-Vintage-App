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

    const provider = LocalStorageProvider;

    return {

        get: provider.get,

        set: provider.set,

        remove: provider.remove,

        clear: provider.clear

    };

})();