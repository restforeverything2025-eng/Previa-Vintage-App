/*
=========================================================
PREVIA Search 2.0
Version: 1.0
Status: Development
=========================================================
*/

    const SEARCH_DELAY = 500;

class SearchManager {

    constructor() {

        this.state = "HOME";
        this.searchTimer = null;

        console.log("SearchManager initialized");

    }

setMessage(text) {

    const message = document.getElementById("search-message");

    if (!message) return;

    message.textContent = text;

}

handleInput(value) {

    value = value.trim().toLowerCase();

    if (this.searchTimer) {
        clearTimeout(this.searchTimer);
    }

    if (value.length === 0) {

        this.setMessage("Почніть вводити назву, бренд або SKU.");

        return;

    }

    if (value.length < 3) {

        this.setMessage("Введіть мінімум 3 символи...");

        return;

    }

    this.searchTimer = setTimeout(() => {

        console.log("Searching:", value);

    }, SEARCH_DELAY);

}

enterSearchMode() {

        this.state = "SEARCH";

        document.body.classList.add("search-mode");

        this.setMessage("Почніть вводити назву, бренд або SKU.");

        console.log("Search Mode");

    }

exitSearchMode() {

        this.state = "HOME";

        document.body.classList.remove("search-mode");

        console.log("Home Mode");

    }

}

window.Search = new SearchManager();