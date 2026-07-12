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

        <section class="links-hub">

            <div class="links-hub-divider"></div>

            <div class="links-hub-title">
                FOLLOW PREVIA
            </div>

                <div class="social-links">

    <a
        class="instagram-link"
        href="https://www.instagram.com/previa.vintage?igsh=Y3VocjhkaGkxNmty"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
    >
        ${Icons.getInstagram()}
    </a>

    <a
        class="instagram-link"
        href="https://www.threads.com/@previa.vintage"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Threads"
    >
        ${Icons.getThreads()}
    </a>

</div>

            <div class="links-pages">

                <a href="#">
                    About PREVIA
                </a>

                <span>•</span>

                <a href="#">
                    Delivery & Payment
                </a>

            </div>

        </section>
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