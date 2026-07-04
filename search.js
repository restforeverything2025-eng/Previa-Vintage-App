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

        this.performSearch(value);

    }, SEARCH_DELAY);

}

performSearch(query) {

    query = query.trim().toLowerCase();

    const results = [

        ...this.searchByName(query),

        ...this.searchByBrand(query),

        ...this.searchBySKU(query),

        ...this.searchByDescription(query)

    ];

    const uniqueResults = this.removeDuplicates(results);

    console.table(uniqueResults);

    return uniqueResults;

}

searchByName(query) {

    return products.filter(product =>

        product.name
            .toLowerCase()
            .includes(query)

    );

}

searchByBrand(query) {

    return products.filter(product =>

        product.brand
            .toLowerCase()
            .includes(query)

    );

}

searchBySKU(query) {

    return products.filter(product =>

        (product.sku || "")
            .toLowerCase()
            .replace(/-/g, "")
            .includes(query)

    );

}

searchByDescription(query) {

    return products.filter(product =>

        product.description
            .toLowerCase()
            .includes(query)

    );

}

removeDuplicates(results) {

    const unique = [];

    const ids = new Set();

    results.forEach(product => {

        if (!ids.has(product.id)) {

            ids.add(product.id);

            unique.push(product);

        }

    });

    return unique;

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