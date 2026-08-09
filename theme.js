/*
=========================================
PREVIA

theme.js

Theme Module

Responsibility:

- Manage Boutique visual theme.
- Switch between dark and light themes.
- Persist user's theme preference.
=========================================
*/

const Theme = (() => {

    const STORAGE_KEY = "previa-theme";

    function apply(theme) {

        document.body.classList.toggle(
            "light-theme",
            theme === "light"
        );

        const button =
            document.getElementById("theme-toggle");

        if (button) {

            button.innerHTML =
    theme === "light"
        ? Icons.getMoon()
        : Icons.getSun();

        }

    }

    function getSavedTheme() {

        return localStorage.getItem(
            STORAGE_KEY
        ) || "dark";

    }

    function toggle() {

        const current =
            getSavedTheme();

        const next =
            current === "dark"
                ? "light"
                : "dark";

        localStorage.setItem(
            STORAGE_KEY,
            next
        );

        apply(next);

    }

    function init() {

        const theme =
            getSavedTheme();

        apply(theme);

        const button =
            document.getElementById(
                "theme-toggle"
            );

        if (button) {

            button.addEventListener(
                "click",
                toggle
            );

        }

    }

    return {

        init,
        toggle

    };

})();