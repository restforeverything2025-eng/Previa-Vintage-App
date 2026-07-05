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

renderResults(results) {

    const container = document.getElementById("search-results");

    if (!container) return;

    if (results.length === 0) {

        container.innerHTML = "<p>Нічого не знайдено.</p>";

        return;

    }

    let html = "";

    results.forEach(product => {

        html += this.renderProductCard(product);

    });

    container.innerHTML = html;

}

resetSearchView() {

    const results = document.getElementById("search-results");

    const suggestions = document.getElementById("search-suggestions");

    if (results) {

        results.innerHTML = "";

    }

    if (suggestions) {

        suggestions.innerHTML = "";

    }

    this.setMessage("Почніть вводити назву, бренд або SKU.");

}

clearSearch() {

    const input = document.getElementById("searchInput");

    const results = document.getElementById("search-results");

    const suggestions = document.getElementById("search-suggestions");

    if (input) {
        input.value = "";
    }

    if (results) {
        results.innerHTML = "";
    }

    if (suggestions) {
        suggestions.innerHTML = "";
    }

    this.setMessage("Пошук за назвою, брендом або SKU.");

    document.body.classList.remove("search-mode");

    this.state = "HOME";

}

renderProductCard(product) {

    return `

        <div
            class="search-product"
            onclick="showProduct('${product.id}')"
        >

            <img
                src="${product.images[0]}"
                class="search-product-image"
                alt="${product.name}"
            >

            <div class="search-product-info">

                <div class="search-product-brand">

                    ${product.brand}

                </div>

                <div class="search-product-name">

                    ${product.name}

                </div>

            </div>

        </div>

    `;

}

handleInput(value) {

    value = value.trim().toLowerCase();

    if (this.searchTimer) {
        clearTimeout(this.searchTimer);
    }

    if (value.length === 0) {

    this.resetSearchView();

    return;

}

    if (value.length < 3) {

    this.resetSearchView();

    this.setMessage("Введіть мінімум 3 символи...");

    return;

}

    this.searchTimer = setTimeout(() => {

        const results = this.performSearch(value);

        this.renderResults(results);

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