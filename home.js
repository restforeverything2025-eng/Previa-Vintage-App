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

    currentCategory = goHome;

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

    html += renderProductCard(
        product,
        "home",
        false
    );

});

    html += `
        </div>
    `;

    container.innerHTML = html;

}

function goHome() {

    currentView = "home";

    currentCategory = null;

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