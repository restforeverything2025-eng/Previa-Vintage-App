function showJewelry() {

    document.getElementById(
    "home-new-products"
).innerHTML = "";
    window.scrollTo(0, 0);
    document.getElementById("search-container").style.display = "block";
    document.getElementById("categories").style.display = "none";
    const content = document.getElementById("content");

    const jewelry = products.filter(
        product => product.category === "Прикраси"
    );

    let html = `
    <div class="top-actions">
<button class="home-btn" onclick="goHome()">
    ⌘ Home
</button>

</div>
    <h2>💍 Прикраси</h2>
    <div class="products-grid">
`;

    jewelry.forEach(product => {

        html += `
    <div class="card" onclick="showProduct('${product.id}')">
    ${isNewProduct(product)
    ? '<div class="new-badge">🆕 NEW</div>'
    : ''
}
        <img
            src="${product.images[0]}"
            alt="${product.name}"
            class="catalog-image"
        >

        <h3>${product.name}</h3>

        <p class="product-price">${product.price}</p>

        <p>${getStatus(product.status)}</p>

    </div>
`;

    });
    html += `</div>`;
    
    content.innerHTML = html;
}
function showWatches() {

    document.getElementById(
    "home-new-products"
).innerHTML = "";
    window.scrollTo(0, 0);
    document.getElementById("search-container").style.display = "block";
    document.getElementById("categories").style.display = "none";
    const content = document.getElementById("content");

    const watches = products.filter(
        product => product.category === "Годинники"
    );

    let html = `
    <div class="top-actions">
<button class="home-btn" onclick="goHome()">
    ⌘ Home
</button>

    </div>

    <h2>⌚ Годинники</h2>

    <div class="products-grid">
`;

    watches.forEach(product => {

        html += `
    <div class="card" onclick="showProduct('${product.id}')">

        <img
            src="${product.images[0]}"
            alt="${product.name}"
            class="catalog-image"
        >

        <h3>${product.name}</h3>

        <p class="product-price">${product.price}</p>

        <p>${getStatus(product.status)}</p>

    </div>
`;

    });
    html += `</div>`;

    content.innerHTML = html;
}
function showAccessories() {

    document.getElementById(
    "home-new-products"
).innerHTML = "";
    window.scrollTo(0, 0);

    document.getElementById("search-container").style.display = "none";

    document.getElementById("categories").style.display = "none";

    document.getElementById("content").innerHTML = `

        <div class="top-actions">
<button class="home-btn" onclick="goHome()">
    ⌘ Home
</button>

        </div>

        <div class="card">

            <h2>🎩 Аксесуари</h2>

            <p>Розділ наповнюється новими товарами.</p>

        </div>

    `;
}
function showSale() {

    document.getElementById(
    "home-new-products"
).innerHTML = "";
    window.scrollTo(0, 0);

    document.getElementById("search-container").style.display = "none";

    document.getElementById("categories").style.display = "none";

    document.getElementById("content").innerHTML = `

        <div class="top-actions">
<button class="home-btn" onclick="goHome()">
    ⌘ Home
</button>

        </div>

        <div class="card">

            <h2>🏷️ Sale</h2>

            <p>Акційні пропозиції скоро з'являться.</p>

        </div>

    `;
}
function showNewProducts() {

    document.getElementById(
    "home-new-products"
).innerHTML = "";
    window.scrollTo(0, 0);
    document.getElementById("search-container").style.display = "block";
    document.getElementById("categories").style.display = "none";
    const content = document.getElementById("content");

    const newProducts = products.filter(
    product => isNewProduct(product)
);

    let html = `
    <div class="top-actions">
<button class="home-btn" onclick="goHome()">
    ⌘ Home
</button>

    </div>
    <h2>🆕 Надходження</h2>
    <div class="products-grid">
`;

    newProducts.forEach(product => {

        html += `
    <div class="card" onclick="showProduct('${product.id}')">

        <img
            src="${product.images[0]}"
            alt="${product.name}"
            class="catalog-image"
        >

        <h3>${product.name}</h3>

        <p class="product-price">${product.price}</p>

        <p>${getStatus(product.status)}</p>

    </div>
`;

    });
    html += `</div>`;
    
    content.innerHTML = html;
}
function reserveProduct(productName) {

    const message =
        `Доброго дня!

Мене цікавить товар:

${productName}

Чи актуальний він?`;

    const telegramUrl =
        `https://t.me/Ad_astra_per_astera?text=${encodeURIComponent(message)}`;

    window.open(telegramUrl, "_blank");

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
function getStatus(status) {

    switch(status) {

        case "available":
            return `
            <span class="status-badge status-available">
                В наявності
            </span>
            `;

        case "reserved":
            return `
            <span class="status-badge status-reserved">
                Заброньовано
            </span>
            `;

        case "sold":
            return `
            <span class="status-badge status-sold">
                Продано
            </span>
            `;

        default:
            return status;
    }

}
function goHome() {
    window.scrollTo(0, 0);
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
function showProduct(productId) {

    document.getElementById(
    "home-new-products"
).innerHTML = "";
    window.scrollTo(0, 0);
    const product = products.find(
        p => p.id === productId
    );

    let currentImage = 0;

    const content = document.getElementById("content");

    content.innerHTML = `

        <div class="card">

            <h2>${product.name}</h2>
            <img
    src="${product.images[0]}"
    alt="${product.name}"
    class="product-image"
    >

            <p><strong>Ціна:</strong> ${product.price}</p>
            
            <p>${product.description}</p>
            <p>${getStatus(product.status)}</p>
            <br>

            <button onclick="reserveProduct('${product.name}')">
                💬 Написати в Telegram
            </button>
<p style="font-size:14px;">
    Напишіть менеджеру та вкажіть назву товару.
</p>
            <br><br>

            <button onclick="${
    product.category === 'Прикраси'
        ? 'showJewelry()'
        : 'showWatches()'
}">
    ← Назад
</button>

<button class="home-btn" onclick="goHome()">
    ⌘ Home
</button>

        </div>

    `;
}
function updateCounters() {

    document.getElementById("watches-count").innerHTML =
    `
    <div class="category-icon">⌚</div>
    <div class="category-title">WATCH</div>
    `;

    document.getElementById("jewelry-count").innerHTML =
    `
    <div class="category-icon">💍</div>
    <div class="category-title">JEWEL</div>
    `;

    document.getElementById("new-count").innerHTML =
`
<div class="category-icon">✨</div>
<div class="category-title">NEW</div>
`;
}
updateCounters();
function searchProducts() {

    const search = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    const cards = document.querySelectorAll(".products-grid .card");

    cards.forEach(card => {

        const text = card.textContent.toLowerCase();

        if(text.includes(search)) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}
function globalSearch() {

document.getElementById(
    "home-new-products"
).innerHTML = "";

    const search = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

    if(search.length === 0) {

    goHome();

    return;

}

if(search.length < 2) {

    return;

}

    document.getElementById("categories").style.display = "none";

    let results = products.filter(product =>

        product.name.toLowerCase().includes(search) ||

        product.description.toLowerCase().includes(search) ||

        product.price.toLowerCase().includes(search)

    );

    let html = `
        <h2>🔍 Результати пошуку</h2>
        <div class="products-grid">
    `;

    results.forEach(product => {

        html += `
            <div class="card" onclick="showProduct('${product.id}')">

                <img
                    src="${product.images[0]}"
                    alt="${product.name}"
                    class="catalog-image"
                >

                <h3>${product.name}</h3>

                <p>${product.price}</p>

                <p>${getStatus(product.status)}</p>

            </div>
        `;

    });

    html += `</div>`;

    html += `
        <br>
        <button class="home-btn" onclick="goHome()">
    ⌘ Home
</button>
    `;

    document.getElementById("content").innerHTML = html;

}
updateCounters();
showHomeNewProducts();
function showHomeNewProducts() {

    const container =
        document.getElementById("home-new-products");

    const latestProducts =
        [...products].slice(-6).reverse();

    let html = `
        <h2 class="home-section-title">
            ✨ Нові надходження
        </h2>

        <div class="products-grid">
    `;

    latestProducts.forEach(product => {

        html += `
            <div
                class="card"
                onclick="showProduct('${product.id}')"
            >

                <img
                    src="${product.images[0]}"
                    alt="${product.name}"
                    class="catalog-image"
                >

                <h3>${product.name}</h3>

                <p class="product-price">
                    ${product.price}
                </p>

            </div>
        `;

    });

    html += `
        </div>
    `;

    container.innerHTML = html;

}
function scrollToTop() {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}
window.addEventListener("scroll", function() {

    const button = document.getElementById("scrollTopBtn");

    if(window.scrollY > 300) {

        button.style.display = "block";

    } else {

        button.style.display = "none";

    }

});