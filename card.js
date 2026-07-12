/* =========================================
   Product Card Module
   Shared product card renderer
========================================= */

function renderProductCard(
    product,
    source = "category",
    showStatus = true
 )
  
{

    return `
        <div
            class="card"
            onclick="showProduct('${product.id}', '${source}')"
        >

        <div
            class="favorite-button ${Favorites.has(product.id) ? "active" : ""}"
            onclick="toggleFavorite('${product.id}', this, event)"
        >
            ${Icons.getHeart()}
</div>

        <div class="catalog-image-wrapper">

        <img
            src="${product.images[0]}"
            alt="${product.name}"
            class="catalog-image"
        >
</div>

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

function renderRelatedProductCard(product) {

    return `

        <div
            class="related-card"
            onclick="showProduct('${product.id}', 'related')"
        >

            <img
                src="${product.images[0]}"
                alt="${product.name}"
                class="related-image"
            >

            <div class="related-title">

                ${product.name}

            </div>

        </div>

    `;

}