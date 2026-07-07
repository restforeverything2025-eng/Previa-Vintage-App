function showFavorites() {

    currentView = "favorites";

    currentCategory = showFavorites;

    scrollToCatalog();

    document.getElementById(
        "home-new-products"
    ).innerHTML = "";

    document.getElementById(
        "search-container"
    ).style.display = "block";

    document.getElementById(
        "categories"
    ).style.display = "none";

    const content =
        document.getElementById("content");

    const favoriteIds =
        Favorites.getAll();

    if (favoriteIds.length === 0) {

        content.innerHTML = `

            <div class="card">

                <h2>Favorites</h2>

                <p>
                    У вас поки немає обраних товарів.
                </p>

            </div>

        `;

        return;

    }

    const favoriteProducts = products.filter(product =>
    favoriteIds.includes(product.id)
);

let html = `
    <h2>Favorites</h2>

    <div class="products-grid">
`;

favoriteProducts.forEach(product => {

    html += `
        <div
            class="card"
            onclick="showProduct('${product.id}', 'favorites')"
        >

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

            <p class="product-price">
                ${formatPrice(product)}
            </p>

            <p>${getStatus(product.status)}</p>

        </div>
    `;

});

html += `
    </div>
`;

content.innerHTML = html;

}