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
    jewelry: 0,
    bags: 0,
    glasses: 0,
    apparel: 0,
    decor: 0

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

        menu.addEventListener("wheel", (event) => {

        if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {

        event.preventDefault();

        menu.scrollLeft += event.deltaY;

    }

        }, { passive: false });

    });

}

function resetSubcategoryScroll() {

    subcategoryScroll.watches = 0;
    subcategoryScroll.jewelry = 0;
    subcategoryScroll.bags = 0;
    subcategoryScroll.glasses = 0;
    subcategoryScroll.apparel = 0;
    subcategoryScroll.decor = 0;

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

function showBags(brand = "ALL") {

    currentView = "category";

    currentCategory = () => showBags(brand);

    document.getElementById(
        "home-new-products"
    ).innerHTML = "";

    scrollToCatalog();

    document.getElementById("search-container").style.display = "block";
    document.getElementById("categories").style.display = "none";

    const content = document.getElementById("content");

    const bags = products.filter(product => {

        if (product.category !== "Сумки") {

            return false;

        }

        if (brand === "ALL") {

            return true;

        }

        return product.brand.trim() === brand.trim();

    });

    const brands = [...new Set(

        products
            .filter(product => product.category === "Сумки")
            .map(product => product.brand.trim())

    )].sort((a, b) => a.localeCompare(b));

    let html = `
    <div class="top-actions">

        <div class="subcategory-menu">

            <div
                class="subcategory-btn all-btn ${brand === 'ALL' ? 'active' : ''}"
                onclick="showBags('ALL')"
            >
                ALL
            </div>

            ${brands.map(item => `

                <div
                    class="subcategory-btn ${brand === item ? 'active' : ''}"
                    onclick="showBags('${item}')"
                >
                    ${item}
                </div>

            `).join("")}

        </div>

    </div>

    <h2>BAGS</h2>

    <div class="products-grid">
    `;

    bags.forEach(product => {

        html += renderProductCard(product);

    });

    html += `</div>`;

    content.innerHTML = html;

    restoreSubcategoryScroll("bags");

}

function showGlasses(brand = "ALL") {

    currentView = "category";

    currentCategory = () => showGlasses(brand);

    document.getElementById(
        "home-new-products"
    ).innerHTML = "";

    scrollToCatalog();

    document.getElementById("search-container").style.display = "block";
    document.getElementById("categories").style.display = "none";

    const content = document.getElementById("content");

    const glasses = products.filter(product => {

        if (product.category !== "Окуляри") {

            return false;

        }

        if (brand === "ALL") {

            return true;

        }

        return product.brand.trim() === brand.trim();

    });

    const brands = [...new Set(

        products
            .filter(product => product.category === "Окуляри")
            .map(product => product.brand.trim())

    )].sort((a, b) => a.localeCompare(b));

    let html = `
    <div class="top-actions">

        <div class="subcategory-menu">

            <div
                class="subcategory-btn all-btn ${brand === 'ALL' ? 'active' : ''}"
                onclick="showGlasses('ALL')"
            >
                ALL
            </div>

            ${brands.map(item => `

                <div
                    class="subcategory-btn ${brand === item ? 'active' : ''}"
                    onclick="showGlasses('${item}')"
                >
                    ${item}
                </div>

            `).join("")}

        </div>

    </div>

    <h2>GLASSES</h2>

    <div class="products-grid">
    `;

    glasses.forEach(product => {

        html += renderProductCard(product);

    });

    html += `</div>`;

    content.innerHTML = html;

    restoreSubcategoryScroll("glasses");

}

function showApparel(brand = "ALL") {

    currentView = "category";

    currentCategory = () => showApparel(brand);

    document.getElementById(
        "home-new-products"
    ).innerHTML = "";

    scrollToCatalog();

    document.getElementById("search-container").style.display = "block";
    document.getElementById("categories").style.display = "none";

    const content = document.getElementById("content");

    const apparel = products.filter(product => {

        if (product.category !== "Одяг") {

            return false;

        }

        if (brand === "ALL") {

            return true;

        }

        return product.brand.trim() === brand.trim();

    });

    const brands = [...new Set(

        products
            .filter(product => product.category === "Одяг")
            .map(product => product.brand.trim())

    )].sort((a, b) => a.localeCompare(b));

    let html = `
    <div class="top-actions">

        <div class="subcategory-menu">

            <div
                class="subcategory-btn all-btn ${brand === 'ALL' ? 'active' : ''}"
                onclick="showApparel('ALL')"
            >
                ALL
            </div>

            ${brands.map(item => `

                <div
                    class="subcategory-btn ${brand === item ? 'active' : ''}"
                    onclick="showApparel('${item}')"
                >
                    ${item}
                </div>

            `).join("")}

        </div>

    </div>

    <h2>APPAREL</h2>

    <div class="products-grid">
    `;

    apparel.forEach(product => {

        html += renderProductCard(product);

    });

    html += `</div>`;

    content.innerHTML = html;

    restoreSubcategoryScroll("apparel");

}

function showDecor(brand = "ALL") {

    currentView = "category";

    currentCategory = () => showDecor(brand);

    document.getElementById(
        "home-new-products"
    ).innerHTML = "";

    scrollToCatalog();

    document.getElementById("search-container").style.display = "block";
    document.getElementById("categories").style.display = "none";

    const content = document.getElementById("content");

    const decor = products.filter(product => {

        if (product.category !== "Декор") {

            return false;

        }

        if (brand === "ALL") {

            return true;

        }

        return product.brand.trim() === brand.trim();

    });

    const brands = [...new Set(

        products
            .filter(product => product.category === "Декор")
            .map(product => product.brand.trim())

    )].sort((a, b) => a.localeCompare(b));

    let html = `
    <div class="top-actions">

        <div class="subcategory-menu">

            <div
                class="subcategory-btn all-btn ${brand === 'ALL' ? 'active' : ''}"
                onclick="showDecor('ALL')"
            >
                ALL
            </div>

            ${brands.map(item => `

                <div
                    class="subcategory-btn ${brand === item ? 'active' : ''}"
                    onclick="showDecor('${item}')"
                >
                    ${item}
                </div>

            `).join("")}

        </div>

    </div>

    <h2>DECOR</h2>

    <div class="products-grid">
    `;

    decor.forEach(product => {

        html += renderProductCard(product);

    });

    html += `</div>`;

    content.innerHTML = html;

    restoreSubcategoryScroll("decor");

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
    <h2>Recent Discoveries</h2>
    <div class="products-grid">
`;

    newProducts.forEach(product => {

    html += renderProductCard(product);

});

html += `</div>`;

content.innerHTML = html;

}

