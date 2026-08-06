/*
==================================================
PREVIA

identity.js

Identity Module

Responsibility:
- Store current customer identity.
- Provide Identity API.
- Do not perform authentication.
==================================================
*/

const Identity = (() => {

    let currentIdentity = null;

    function getCurrent() {
        return currentIdentity;
    }

    function isAuthenticated() {
        return currentIdentity !== null;
    }

    function setCurrent(identity) {
    currentIdentity = identity;
    }

    return {
        getCurrent,
        setCurrent,
        isAuthenticated
        
    };

})();