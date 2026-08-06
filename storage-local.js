/*
==================================================
PREVIA

storage-local.js

Local Storage Provider

Responsibility:
- Read and write data
  using Browser Local Storage.
- Hide Local Storage API.
==================================================
*/

const LocalStorageProvider = (() => {

    function get(key) {

        const value = localStorage.getItem(key);

        return value
            ? JSON.parse(value)
            : null;

    }

    function set(key, value) {

        localStorage.setItem(
            key,
            JSON.stringify(value)
        );

    }

    function remove(key) {

        localStorage.removeItem(key);

    }

    function clear() {

        localStorage.clear();

    }

    return {

        get,
        set,
        remove,
        clear

    };

})();