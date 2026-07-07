/* =========================================
   Product Card Module
   Shared product card renderer
========================================= */

function renderProductCard(
    product,
    source = "category",
    showStatus = true
) {

    return `
        <div
            class="card"
            onclick="showProduct('${product.id}', '${source}')"
        >

            <div
                class="favorite-button"
                onclick="toggleFavorite('${product.id}', this, event)"
            >
                ${Favorites.has(product.id) ? "♥" : "♡"}
            </div>

            <img
                src="${product.images[0]}"
                alt="${product.name}"
                class="catalog-image"
            >

            <h3>${product.name}</h3>

            <p class="product-price">
                ${formatPrice(product)}
            </p>

            ${showStatus
                ? `<p>${getStatus(product.status)}</p>`
                : ""
            }

        </div>
    `;

}