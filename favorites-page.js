function showFavorites(preserveScroll = false) {

    currentView = "favorites";

    currentCategory = showFavorites;

    if (!preserveScroll) {

        scrollToCatalog();

    }

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

    if (!Favorites.isReady()) {

        content.innerHTML = `

            <div class="card">

                <h2>Favorites</h2>

                <p>
                    Завантажуємо ваші обрані товари…
                </p>

            </div>

        `;

        return;

    }

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

    html += renderProductCard(
        product,
        "favorites"
    );

});

html += `
    </div>
`;

content.innerHTML = html;

}

function refreshFavoritesViewAfterReady() {

    if (
        typeof currentView === "undefined" ||
        currentView !== "favorites"
    ) {

        return;

    }

    showFavorites(true);

}
