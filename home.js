/*
=========================================================
PREVIA Home
Version: 1.0
Status: Development
=========================================================
*/

function updateCounters() {

    document.getElementById("watches-count").innerHTML =
    `
    <div class="category-title">WATCHES</div>
    `;

    document.getElementById("jewelry-count").innerHTML =
    `
    <div class="category-title">JEWELRY</div>
    `;

    document.getElementById("new-count").innerHTML =
`

    <div class="category-title">NEW</div>
`;
}

function showHomeNewProducts() {

    const container =
        document.getElementById("home-new-products");

    const latestProducts =
        [...products].slice(-6).reverse();

    let html = `
        <h2 class="home-section-title">
            NEW ARRIVALS
        </h2>

        <div class="products-grid">
    `;

    latestProducts.forEach(product => {

        html += `
            <div
                class="card"
                onclick="showProduct('${product.id}', 'home')">

            <div
                class="favorite-button"
                onclick="toggleFavorite('${product.id}', this, event)"
            >
                ${Favorites.has(product.id) ? "♥" : "♡"}
            </div>

                <img
                    src="${product.images[0]}"
                    alt="${product.name}"
                    class="catalog-image"
                >

                <h3>${product.name}</h3>

                <p class="product-price">${formatPrice(product)}</p>

            </div>
        `;

    });

    html += `
        </div>
    `;

    container.innerHTML = html;

}

function goHome() {

    currentView = "home";

    scrollToCatalog();

    document.getElementById("categories").style.display = "";

    document.getElementById("search-container").style.display = "block";

    document.getElementById("searchInput").value = "";

    document.getElementById("content").innerHTML = "";

    document.getElementById("categories").scrollTo({
    left: 0,
    behavior: "smooth"
});

showHomeNewProducts();
}

function initializeHome() {

    updateCounters();

    showHomeNewProducts();

}