/*
=========================================================
PREVIA Product
Version: 1.0
Status: Development
=========================================================
*/

/* =========================================
   Timeline Configuration
========================================= */

const TIMELINE_START = 1970;

const TIMELINE_END = 2020;

/* =========================================
   Timeline Helpers
========================================= */

function getTimelinePosition(year) {

    return Math.max(
        0,
        Math.min(
            100,
            ((Number(year) - TIMELINE_START) /
            (TIMELINE_END - TIMELINE_START)) * 100
        )
    );

}

/* =========================================
   Era Timeline
========================================= */

function renderEraTimeline(product) {

    if (!product.eraFrom) {

        return "";

    }

    const eraFromPercent =
        getTimelinePosition(product.eraFrom);

    const eraToPercent =
        getTimelinePosition(product.eraTo);

    const isEraRange =
        Number(product.eraFrom) !== Number(product.eraTo);

    return `

<div class="era-timeline">

    <span class="timeline-year">
        ${TIMELINE_START}
    </span>

    <div class="timeline-line">

        ${isEraRange ? `

           <div
               class="timeline-range"
               style="
                   left:${eraFromPercent}%;

                   width:${eraToPercent - eraFromPercent}%;
               "
            >

               <div class="timeline-range-start"></div>

               <div class="timeline-range-end"></div>

        </div>

        ` : `

            <div
                class="timeline-dot"
                style="
                    left:${eraFromPercent}%;
                "
            ></div>

        `}

    </div>

    <span class="timeline-year">
        ${TIMELINE_END}
    </span>

</div>

`;

}

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

    return `≈ ₴ ${price.toLocaleString("uk-UA")}<br>
    за курсом ${exchangeRate.source}`;
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

    const telegramUsername = Config.telegramUsername;

    const appUrl = `tg://resolve?domain=${telegramUsername}`;

    const webUrl = `https://t.me/${telegramUsername}`;

    window.location.href = appUrl;

    setTimeout(() => {

        if (document.visibilityState === "visible") {

            window.location.href = webUrl;

        }

    }, 800);

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

    const product = products.find(
        p => p.id === productId
);

if (!product) {

    return;

}

    currentProduct = product;

    history.replaceState(

    null,

    "",

    `${window.location.pathname}?product=${product.id}`

);

    currentImages = product.images;

    currentImageIndex = 0;

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

         <br>

    <div class="info-row">

        <span class="info-title">
            Product Code
        </span>

        <span class="info-value">
            ${product.sku.substring(0,1)}-${product.sku.substring(1)}
        </span>

    </div>

         <br>

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

         <br>

    <div class="info-row">

        <span class="info-title">
            Status
        </span>

        <span class="info-value">
            ${getStatus(product.status)}
        </span>

    </div>

         <br>

    <div class="info-row">

        <span class="info-title">
            Era
        </span>

        <span class="info-value">
             ${
                 product.eraFrom
                     ? (
                        product.eraFrom === product.eraTo
                            ? product.eraFrom
                            : `${product.eraFrom}–${product.eraTo}`
    )
    : "—"
}
        </span>

    </div>

         <br>

    ${renderEraTimeline(product)}

<p class="product-description">

    ${product.description}

</p>

    ${renderRelatedProducts(product)}

            <button
    class="telegram-button"
    onclick='OrderModal.open(${JSON.stringify(product)})'
>
    ${Icons.getTelegram()}
    ЗАМОВИТИ
</button>
            
<p class="telegram-note">
    Please include the Product Code in your message.
</p>
            <br><br>

        </div>

    `;

    content.scrollIntoView({
    behavior: "smooth",
    block: "start"
});
}

