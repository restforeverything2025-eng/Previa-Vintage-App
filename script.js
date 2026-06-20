function showJewelry() {

    const content = document.getElementById("content");

    const jewelry = products.filter(
        product => product.category === "Прикраси"
    );

    let html = "<h2>💍 Прикраси</h2>";

    jewelry.forEach(product => {

        html += `
    <div class="card" onclick="showProduct('${product.id}')">

        <img
            src="${product.image}"
            alt="${product.name}"
            class="catalog-image"
        >

        <h3>${product.name}</h3>

        <p>${product.price}</p>

        <p>${product.status}</p>

    </div>
`;

    });

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
function showWatches() {

    const content = document.getElementById("content");

    const watches = products.filter(
        product => product.category === "Годинники"
    );

    let html = "<h2>⌚ Годинники</h2>";

    watches.forEach(product => {

        html += `
    <div class="card" onclick="showProduct('${product.id}')">

        <img
            src="${product.image}"
            alt="${product.name}"
            class="catalog-image"
        >

        <h3>${product.name}</h3>

        <p>${product.price}</p>

        <p>${product.status}</p>

    </div>
`;

    });

    content.innerHTML = html;
}
function goHome() {

    const content = document.getElementById("content");

    content.innerHTML = "";

}
function showProduct(productId) {

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
            <p><strong>Статус:</strong> ${product.status}</p>
            <p>${product.description}</p>

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

<button onclick="goHome()">
    🏠 На головну
</button>

        </div>

    `;
}
function showNewProducts() {

    const content = document.getElementById("content");

    const newProducts = products.filter(
        product => product.isNew === true
    );

    let html = "<h2>🆕 Нові надходження</h2>";

    newProducts.forEach(product => {

        html += `
    <div class="card" onclick="showProduct('${product.id}')">

        <img
            src="${product.image}"
            alt="${product.name}"
            class="catalog-image"
        >

        <h3>${product.name}</h3>

        <p>${product.price}</p>

        <p>${product.status}</p>

    </div>
`;

    });

    content.innerHTML = html;
}
function updateCounters() {

    const watchesCount = products.filter(
        p => p.category === "Годинники"
    ).length;

    const jewelryCount = products.filter(
        p => p.category === "Прикраси"
    ).length;

    const newCount = products.filter(
        p => p.isNew === true
    ).length;

    document.getElementById("watches-count").innerText =
        `⌚ Годинники (${watchesCount})`;

    document.getElementById("jewelry-count").innerText =
        `💍 Прикраси (${jewelryCount})`;

    document.getElementById("new-count").innerText =
        `🆕 Нові надходження (${newCount})`;
}
updateCounters();