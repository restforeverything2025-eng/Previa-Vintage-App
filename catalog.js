/*
=========================================================
PREVIA Catalog
Version: 1.0
Status: Development
=========================================================
*/

/* =========================================
   Subcategory Scroll State
========================================= */

let subcategoryScroll = {

    watches: 0,
    jewelry: 0

};

function saveSubcategoryScroll(type) {

    const menu = document.querySelector(".subcategory-menu");

    if (!menu) return;

    subcategoryScroll[type] = menu.scrollLeft;

}

function restoreSubcategoryScroll(type) {

    requestAnimationFrame(() => {

        const menu = document.querySelector(".subcategory-menu");

        if (!menu) return;

        menu.scrollLeft = subcategoryScroll[type];

        menu.addEventListener("scroll", () => {

            subcategoryScroll[type] = menu.scrollLeft;

        });

    });

}

function resetSubcategoryScroll() {

    subcategoryScroll.watches = 0;
    subcategoryScroll.jewelry = 0;

}

function isNewProduct(product) {

    const addedDate =
        new Date(product.dateAdded);

    const today =
        new Date();

    const diffDays =
        (today - addedDate) /
        (1000 * 60 * 60 * 24);

    return diffDays <= 7;

}

function showJewelry(brand = "ALL") {
    currentView = "category";
    currentCategory = () => showJewelry(brand);
    document.getElementById(
        "home-new-products"
    ).innerHTML = "";

    scrollToCatalog();

    document.getElementById("search-container").style.display = "block";
    document.getElementById("categories").style.display = "none";

    const content = document.getElementById("content");

    const jewelry = products.filter(product => {

        if (product.category !== "Прикраси") {
            return false;
        }

        if (brand === "ALL") {
            return true;
        }

        return product.brand.trim() === brand.trim();

    });

    const jewelryBrands = products.filter(
    product => product.category === "Прикраси"
);

const brands = [...new Set(

    products
        .filter(product => product.category === "Прикраси")
        .map(product => product.brand.trim())

)].sort((a, b) => a.localeCompare(b));

    let html = `
    <div class="top-actions">

<div class="subcategory-menu">

    <div
        class="subcategory-btn all-btn ${brand === 'ALL' ? 'active' : ''}"
        onclick="showJewelry('ALL')">

        ALL

    </div>

    ${brands.map(item => `

        <div
            class="subcategory-btn ${brand === item ? 'active' : ''}"
            onclick="showJewelry('${item}')">

            ${item}

        </div>

    `).join("")}

</div>

</div>
    <h2>JEWELRY</h2>
    <div class="products-grid">
`;

    jewelry.forEach(product => {

    html += renderProductCard(product);

});

    html += `</div>`;
    
    content.innerHTML = html;

    restoreSubcategoryScroll("jewelry");
    
}

function showWatches(brand = "ALL") {
    currentView = "category";
    currentCategory = () => showWatches(brand);
    document.getElementById(
    "home-new-products"
).innerHTML = "";
    scrollToCatalog();
    document.getElementById("search-container").style.display = "block";
    document.getElementById("categories").style.display = "none";
    const content = document.getElementById("content");

    const watches = products.filter(product => {

    if (product.category !== "Годинники") {

        return false;

    }

    if (brand === "ALL") {

        return true;

    }

    return product.brand.trim() === brand.trim();

});

const brands = [...new Set(

    products
        .filter(product => product.category === "Годинники")
        .map(product => product.brand.trim())

)].sort((a, b) => a.localeCompare(b));

    let html = `
    <div class="top-actions">

<div class="subcategory-menu">

    <div
        class="subcategory-btn all-btn ${brand === 'ALL' ? 'active' : ''}"
        onclick="showWatches('ALL')">

        ALL

    </div>

    ${brands.map(item => `

        <div
            class="subcategory-btn ${brand === item ? 'active' : ''}"
            onclick="showWatches('${item}')">

            ${item}

        </div>

    `).join("")}

</div>

    </div>

    <h2>WATCHES</h2>

    <div class="products-grid">
`;

    watches.forEach(product => {

    html += renderProductCard(product);

});

    html += `</div>`;

    content.innerHTML = html;

    restoreSubcategoryScroll("watches");
}

function showAccessories() {
    currentView = "category";
    currentCategory = showAccessories;
    document.getElementById(
    "home-new-products"
).innerHTML = "";
    scrollToCatalog();

    document.getElementById("search-container").style.display = "none";

    document.getElementById("categories").style.display = "none";

    document.getElementById("content").innerHTML = `

        <div class="top-actions">

        </div>

        <div class="card">

            <h2>BAGS</h2>

            <p>Розділ наповнюється новими товарами.</p>

        </div>

    `;
}

/* =========================================
   Coming Soon Categories
========================================= */

function showComingSoon(categoryName) {

    currentView = "category";

    currentCategory = () => showComingSoon(categoryName);

    document.getElementById("home-new-products").innerHTML = "";

    scrollToCatalog();

    document.getElementById("content").innerHTML = `

        <div class="card">

            <h2>${categoryName}</h2>

            <p>

                Розділ наповнюється новими товарами.

            </p>

        </div>

    `;

}

function showSale() {
    currentView = "category";
    currentCategory = showSale;
    document.getElementById(
    "home-new-products"
).innerHTML = "";
    scrollToCatalog();

    document.getElementById("search-container").style.display = "none";

    document.getElementById("categories").style.display = "none";

    document.getElementById("content").innerHTML = `

        <div class="top-actions">

        </div>

        <div class="card">

            <h2>SALE</h2>

            <p>Акційні пропозиції скоро з'являться.</p>

        </div>

    `;
}

function showNewProducts() {
    currentView = "category";
    currentCategory = showNewProducts;
    document.getElementById(
    "home-new-products"
).innerHTML = "";
    scrollToCatalog();
    document.getElementById("search-container").style.display = "block";
    document.getElementById("categories").style.display = "none";
    const content = document.getElementById("content");

    const newProducts = products
    .filter(product => isNewProduct(product))
    .sort((a, b) =>
        new Date(b.dateAdded) -
        new Date(a.dateAdded)
    );

    let html = `
    <div class="top-actions">

    </div>
    <h2>NEW ARRIVALS</h2>
    <div class="products-grid">
`;

    newProducts.forEach(product => {

    html += renderProductCard(product);

});

html += `</div>`;

content.innerHTML = html;

}

