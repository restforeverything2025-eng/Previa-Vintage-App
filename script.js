function showJewelry() {
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
    ${product.isNew ? '<div class="new-badge">🆕 NEW</div>' : ''}
        <img
            src="${product.image}"
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
            src="${product.image}"
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
    window.scrollTo(0, 0);
    document.getElementById("search-container").style.display = "block";
    document.getElementById("categories").style.display = "none";
    const content = document.getElementById("content");

    const newProducts = products.filter(
        product => product.isNew === true
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
            src="${product.image}"
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
    document.getElementById("categories").style.display = "grid";

    document.getElementById("search-container").style.display = "none";

    document.getElementById("searchInput").value = "";

    document.getElementById("content").innerHTML = "";

}
function showProduct(productId) {
    window.scrollTo(0, 0);
    const product = products.find(
        p => p.id === productId
    );

    const content = document.getElementById("content");

    content.innerHTML = `

        <div class="card">

            <h2>${product.name}</h2>
            <img
    src="${product.image}"
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
    <div class="category-title">Годинники</div>
    `;

    document.getElementById("jewelry-count").innerHTML =
    `
    <div class="category-icon">💍</div>
    <div class="category-title">Прикраси</div>
    `;

    document.getElementById("new-count").innerHTML =
`
<div class="category-icon">✨</div>
<div class="category-title">Надходження</div>
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

    const search = document
        .getElementById("searchInput")
        .value
        .toLowerCase();

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
                    src="${product.image}"
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