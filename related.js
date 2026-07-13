/*
=========================================================
PREVIA Related Products
Version: 1.0
Status: Development
=========================================================
*/

/* =========================================
   Smart Shuffle
========================================= */

function getRelatedProducts(currentProduct) {

    const availableProducts = products.filter(product =>

        product.id !== currentProduct.id

    );

    const shuffledProducts = [...availableProducts];

    for (let i = shuffledProducts.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [shuffledProducts[i], shuffledProducts[j]] =
        [shuffledProducts[j], shuffledProducts[i]];

    }

    return shuffledProducts.slice(0, RELATED_PRODUCTS_COUNT);

}

/* =========================================
   Related Products Section
========================================= */

function renderRelatedProducts(currentProduct) {

    const relatedProducts =
        getRelatedProducts(currentProduct);

    if (relatedProducts.length === 0) {

        return "";

    }

    return `

        <div class="related-products">

            <div class="gold-divider"></div>

            <h2 class="home-section-title">

                YOU MAY ALSO LIKE

            </h2>

            <div class="related-products-row">

                ${relatedProducts.map(product =>

                    renderRelatedProductCard(product)

                ).join("")}

            </div>

            <div class="gold-divider"></div>

        </div>

    `;

}