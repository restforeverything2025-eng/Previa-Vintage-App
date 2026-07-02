let currentImages = [];
let currentImageIndex = 0;
let currentProduct = null;
let currentCategory = null;
let currentView = "home";
let touchStartX = 0;
let touchEndX = 0;
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

        return product.brand === brand;

    });

    const jewelryBrands = products.filter(
    product => product.category === "Прикраси"
);

const brands = [...new Set(

    products
        .filter(product => product.category === "Прикраси")
        .map(product => product.brand)

)].sort((a, b) => a.localeCompare(b));

    let html = `
    <div class="top-actions">
<button class="home-btn" onclick="goHome()">
    ⌘ Home
</button>

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

        html += `
    <div class="card" onclick="showProduct('${product.id}')">
    
        <img
            src="${product.images[0]}"
            alt="${product.name}"
            class="catalog-image"
        >

        <h3>${product.name}</h3>

        <p class="product-price">${formatPrice(product)}</p>

        <p>${getStatus(product.status)}</p>

    </div>
`;

    });
    html += `</div>`;
    
    content.innerHTML = html;
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

    return product.brand === brand;

});

const brands = [...new Set(

    products
        .filter(product => product.category === "Годинники")
        .map(product => product.brand)

)].sort((a, b) => a.localeCompare(b));

    let html = `
    <div class="top-actions">
<button class="home-btn" onclick="goHome()">
    ⌘ Home
</button>

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

        html += `
    <div class="card" onclick="showProduct('${product.id}')">

        <img
            src="${product.images[0]}"
            alt="${product.name}"
            class="catalog-image"
        >

        <h3>${product.name}</h3>

        <p class="product-price">${formatPrice(product)}</p>

        <p>${getStatus(product.status)}</p>

    </div>
`;

    });
    html += `</div>`;

    content.innerHTML = html;
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
<button class="home-btn" onclick="goHome()">
    ⌘ Home
</button>

        </div>

        <div class="card">

            <h2>VINTAGE</h2>

            <p>Розділ наповнюється новими товарами.</p>

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
<button class="home-btn" onclick="goHome()">
    ⌘ Home
</button>

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
<button class="home-btn" onclick="goHome()">
    ⌘ Home
</button>

    </div>
    <h2>NEW ARRIVALS</h2>
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

        <p class="product-price">${formatPrice(product)}</p>

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
function showProduct(productId) {
    currentView = "product";
    document.getElementById(
    "home-new-products"
).innerHTML = "";
    scrollToCatalog();
    const product = products.find(
        p => p.id === productId
    );

    currentProduct = product;

    currentImages = product.images;

    currentImageIndex = 0;

    let currentImage = 0;

    const content = document.getElementById("content");

    content.innerHTML = `

        <div class="card">

            <h2>${product.name}</h2>
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
}
function changeMainImage(imageSrc) {

    document.getElementById(
        "main-product-image"
    ).src = imageSrc;

}
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
    .toLowerCase()
    .replace(/-/g, "");

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

        product.brand.toLowerCase().includes(search) ||

        (product.sku || "")
    .toLowerCase()
    .replace(/-/g, "")
    .includes(search) ||

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
            NEW ARRIVALS
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

                <p class="product-price">${formatPrice(product)}</p>

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
function scrollToCatalog() {

    document.getElementById(
        "search-container"
    ).scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}
function goBack() {

    if (currentView === "product") {

        currentCategory();
        return;

    }

    if (currentView === "category") {

        goHome();
        return;

    }

}
function openLightbox(images, index = 0) {

    currentImages = images;

    currentImageIndex = index;

    const prevButton =
    document.querySelector(".lightbox-prev");

const nextButton =
    document.querySelector(".lightbox-next");

if(images.length <= 1){

    prevButton.style.display = "none";

    nextButton.style.display = "none";

}else{

    prevButton.style.display = "";

    nextButton.style.display = "";

}

    document.getElementById("lightbox").style.display = "flex";

    document.body.style.overflow = "hidden";

    lightbox.addEventListener("touchstart", handleTouchStart);

    lightbox.addEventListener("touchend", handleTouchEnd);

    document.getElementById("lightbox-image").src =
        currentImages[currentImageIndex];

}
function openCurrentImage() {

    const currentSrc =
        document.getElementById("main-product-image").src;

    currentImageIndex =
        currentImages.findIndex(image =>
            currentSrc.includes(image)
        );

    if (currentImageIndex < 0) {

        currentImageIndex = 0;

    }

    openLightbox(
        currentImages,
        currentImageIndex
    );

}
function closeLightbox() {

    document.getElementById("lightbox").style.display = "none";

    document.body.style.overflow = "";

}
function nextImage() {

    const image =
        document.getElementById("lightbox-image");

    image.classList.add("fade");

    setTimeout(() => {

        currentImageIndex++;

        if(currentImageIndex >= currentImages.length){

            currentImageIndex = 0;

        }

        image.src = currentImages[currentImageIndex];

        image.classList.remove("fade");

    },120);

}
function previousImage() {

    const image =
        document.getElementById("lightbox-image");

    image.classList.add("fade");

    setTimeout(() => {

        currentImageIndex--;

        if(currentImageIndex < 0){

            currentImageIndex =
                currentImages.length - 1;

        }

        image.src =
            currentImages[currentImageIndex];

        image.classList.remove("fade");

    },120);

}
function handleTouchStart(event){

    touchStartX = event.changedTouches[0].screenX;

}
function handleTouchEnd(event){

    touchEndX = event.changedTouches[0].screenX;

    handleSwipe();

}
function handleSwipe(){

    const distance = touchEndX - touchStartX;

    if(Math.abs(distance) < 50){

        return;

    }

    if(distance > 0){

        previousImage();

    }else{

        nextImage();

    }

}
document.addEventListener("keydown", function(event){

    const lightbox =
        document.getElementById("lightbox");

    if(lightbox.style.display !== "flex"){

        return;

    }

    if(event.key === "Escape"){

        closeLightbox();

    }

    if(event.key === "ArrowLeft"){

    previousImage();

}

if(event.key === "ArrowRight"){

    nextImage();

}

});
window.addEventListener("scroll", function() {

    const button = document.getElementById("scrollTopBtn");

    if(window.scrollY > 300) {

        button.style.display = "block";

    } else {

        button.style.display = "none";

    }

});