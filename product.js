/*
=========================================================
PREVIA Product
Version: 1.0
Status: Development
=========================================================
*/

function formatPrice(product) {

    const symbols = {

        EUR: "€",
        USD: "$",
        UAH: "₴"

    };

    return (
        symbols[product.currency] || product.currency
    ) + product.price;

}

function formatPriceUAH(product) {

    if (product.currency !== "EUR") {

        return "";

    }

    const price = Math.round(
        product.price * exchangeRate.eurToUah
    );

    return `≈ ₴ ${price.toLocaleString("uk-UA")}`;

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

function showProduct(productId, source = null) {

    currentView = "product";

    if (source) {

        setNavigationSource(source);

    }

    if (source === "search") {

        Search.clearSearch();

    }

    document.getElementById("home-new-products").innerHTML = "";

    // scrollToCatalog();

    const product = products.find(
        p => p.id === productId
);

    currentProduct = product;

    history.replaceState(

    null,

    "",

    `${window.location.pathname}?product=${product.id}`

);

    currentImages = product.images;

    currentImageIndex = 0;

    let currentImage = 0;

    const content = document.getElementById("content");

    content.innerHTML = `

        <div class="card product-card">

            <h2>${product.name}</h2>

<div
    class="favorite-button ${Favorites.has(product.id) ? "active" : ""}"
    onclick="toggleFavorite('${product.id}', this, event)"
>
   ${Icons.getHeart()}
</div>

<div
    class="share-button"
    onclick="Share.shareProduct(currentProduct)"
>
    ${Icons.getShare()}
</div>

<div class="product-gallery">

    <img
        id="main-product-image"
        src="${product.images[0]}"
        alt="${product.name}"
        class="product-image"
        onclick="openCurrentImage()"
    >

    ${product.images.length > 1 ? `

<div class="gallery-thumbnails">

    ${product.images.map(image => `
        <img
            src="${image}"
            class="gallery-thumb"
            onclick="changeMainImage('${image}')"
        >
    `).join("")}

</div>

` : ""}

</div>

            <div class="product-info">

    <div class="info-row">

        <span class="info-title">
            Brand
        </span>

        <span class="info-value">
            ${product.brand}
        </span>

    </div>

    <div class="info-row">

        <span class="info-title">
            Product Code
        </span>

        <span class="info-value">
            ${product.sku.substring(0,1)}-${product.sku.substring(1)}
        </span>

    </div>

            <div class="info-row">

        <span class="info-title">
            Price
        </span>

        <span class="info-value">

        ${formatPrice(product)}

        <br>

        <span class="product-price-uah">
            ${formatPriceUAH(product)}
        </span>

        </span>

    </div>

    <div class="info-row">

        <span class="info-title">
            Status
        </span>

        <span class="info-value">
            ${getStatus(product.status)}
        </span>

    </div>

</div>

<p class="product-description">

    ${product.description}

</p>

            <button onclick="reserveProduct('${product.name}')">
                💬 Написати в Telegram
            </button>
<p class="telegram-note">
    Напишіть менеджеру та вкажіть Product Code товару.
</p>
            <br><br>

        </div>

    `;

    content.scrollIntoView({
    behavior: "smooth",
    block: "start"
});
}

