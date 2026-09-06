/* =========================================
   PREVIA Cart
   Stage 1: local cart only
   No Order/Core/CMS integration yet.
========================================= */

const CART_STORAGE_KEY = "previa_cart_v1";
const CART_MAX_ITEMS = 3;

const Cart = (() => {
    let itemIds = load();

    function load() {
        try {
            const raw = localStorage.getItem(CART_STORAGE_KEY);
            const parsed = JSON.parse(raw || "[]");
            return Array.isArray(parsed) ? [...new Set(parsed)] : [];
        } catch (error) {
            console.warn("PREVIA Cart: failed to load cart", error);
            return [];
        }
    }

    function persist() {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(itemIds));
    }

    function getItems() {
        return itemIds
            .map(id => products.find(product => product.id === id))
            .filter(Boolean);
    }

    function has(productId) {
        return itemIds.includes(productId);
    }

    function add(productOrId) {
        const productId = typeof productOrId === "string"
            ? productOrId
            : productOrId?.id;

        const product = products.find(item => item.id === productId);

        if (!product || product.status !== "available") {
            return false;
        }

        if (has(product.id)) {
            open();
            return false;
        }

        if (itemIds.length >= CART_MAX_ITEMS) {
            if (typeof showToast === "function") {
                showToast(`У кошику максимум ${CART_MAX_ITEMS} товари`);
            }
            return false;
        }

        itemIds.push(product.id);
        persist();
        refreshUI();

        if (typeof showToast === "function") {
            showToast("Товар додано до кошика");
        }

        return true;
    }

    function remove(productId) {
        itemIds = itemIds.filter(id => id !== productId);
        persist();
        refreshUI();
        render();
    }

    function clear() {
        itemIds = [];
        persist();
        refreshUI();
        render();
    }

    function getCount() {
        return itemIds.length;
    }

    function getTotal() {
        return getItems().reduce((sum, product) => {
            return sum + Number(product.price || 0);
        }, 0);
    }

    function formatTotal() {
        const items = getItems();
        if (!items.length) return "0 €";

        const currencies = new Set(items.map(item => item.currency));
        if (currencies.size === 1 && currencies.has("EUR")) {
            return `${getTotal()} €`;
        }

        return items.map(item => formatPrice(item)).join(" + ");
    }

    function open() {
        const modal = document.getElementById("cart-modal");
        if (!modal) return;

        render();
        modal.classList.add("visible");
        document.body.classList.add("cart-open");
    }

    function checkout() {

    const items = getItems();

    if (!items.length) {

        if (typeof showToast === "function") {
            showToast("Кошик порожній.");
        }

        return;

    }

    if (
        typeof OrderModal === "undefined" ||
        typeof OrderModal.openCart !== "function"
    ) {

        console.error(
            "Cart.checkout(): OrderModal.openCart() is not available."
        );

        return;

    }

    close();

    OrderModal.openCart(items);

}

    function close() {
        const modal = document.getElementById("cart-modal");
        if (!modal) return;

        modal.classList.remove("visible");
        document.body.classList.remove("cart-open");
    }

    function render() {
        const list = document.getElementById("cart-items");
        const empty = document.getElementById("cart-empty");
        const summary = document.getElementById("cart-summary");
        const total = document.getElementById("cart-total");

        if (!list || !empty || !summary || !total) return;

        const items = getItems();

        if (!items.length) {
            list.innerHTML = "";
            empty.hidden = false;
            summary.hidden = true;
            return;
        }

        empty.hidden = true;
        summary.hidden = false;

        list.innerHTML = items.map(product => `
            <div class="cart-item">
                <img
                    class="cart-item-image"
                    src="${product.images[0]}"
                    alt="${product.name}"
                >

                <div class="cart-item-info">
                    <div class="cart-item-brand">${product.brand || ""}</div>
                    <div class="cart-item-title">${product.name}</div>
                    <div class="cart-item-price">${formatPrice(product)}</div>
                </div>

                <button
                    class="cart-remove"
                    type="button"
                    aria-label="Видалити ${product.name}"
                    onclick="Cart.remove('${product.id}')"
                >×</button>
            </div>
        `).join("");

        total.textContent = formatTotal();
    }

    function refreshUI() {
        const badge = document.getElementById("cart-count");
        const button = document.getElementById("cart-nav-button");

        if (badge && button) {
            const count = getCount();
            badge.textContent = count;
            badge.hidden = count === 0;
            button.classList.toggle("has-items", count > 0);
        }

        document.querySelectorAll("[data-cart-product]").forEach(buttonEl => {
            const id = buttonEl.dataset.cartProduct;
            const inCart = has(id);
            buttonEl.classList.toggle("in-cart", inCart);
            buttonEl.textContent = inCart ? "У КОШИКУ" : "ДОДАТИ В КОШИК";
            buttonEl.disabled = inCart;
        });
    }

    function init() {
    injectStyles();

    const cartIcon = document.getElementById("cart-icon");

    if (cartIcon && typeof Icons !== "undefined") {
        cartIcon.innerHTML = Icons.getCart();
    }

    refreshUI();
    render();
}

    function injectStyles() {
        if (document.getElementById("previa-cart-styles")) return;

        const style = document.createElement("style");
        style.id = "previa-cart-styles";
        style.textContent = `
            body.cart-open { overflow: hidden; }

            .cart-modal {
                position: fixed;
                inset: 0;
                z-index: 10000;
                display: none;
                background: rgba(20, 18, 16, .72);
                backdrop-filter: blur(5px);
                padding: 20px;
                box-sizing: border-box;
            }

            .cart-modal.visible {
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .cart-window {
                width: min(560px, 100%);
                max-height: 90vh;
                overflow-y: auto;
                background: #fff;
                border-radius: 14px;
                padding: 22px;
                box-sizing: border-box;
                box-shadow: 0 20px 60px rgba(0,0,0,.35);
            }

            .cart-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 18px;
            }

            .cart-header h2 { margin: 0; }

            .cart-close {
                border: 0;
                background: transparent;
                font-size: 30px;
                cursor: pointer;
                color: #333;
            }

            .cart-empty {
                text-align: center;
                padding: 45px 10px;
                color: #6d5b42;
                font-family: 'Cormorant Garamond', serif;
                font-size: 21px;
            }

            .cart-item {
                display: grid;
                grid-template-columns: 72px 1fr auto;
                gap: 14px;
                align-items: center;
                padding: 12px 0;
                border-bottom: 1px solid rgba(0,0,0,.10);
            }

            .cart-item-image {
                width: 72px;
                height: 72px;
                object-fit: cover;
                border-radius: 7px;
            }

            .cart-item-brand {
                font-size: 12px;
                letter-spacing: 1px;
                color: #777;
                text-transform: uppercase;
            }

            .cart-item-title {
                margin: 3px 0;
                font-family: 'Cormorant Garamond', serif;
                font-size: 20px;
                font-weight: 600;
                color: #2c0505;
            }

            .cart-item-price {
                font-size: 16px;
                font-weight: 600;
            }

            .cart-remove {
                border: 0;
                background: transparent;
                color: #630000;
                font-size: 27px;
                cursor: pointer;
                padding: 6px;
            }

            .cart-summary {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 12px;
                padding-top: 18px;
                font-family: 'Cormorant Garamond', serif;
                font-size: 22px;
            }

            .cart-summary[hidden] {
                display: none !important;
            }

            .cart-total {
                color: #630000;
                font-weight: 600;
            }

            .cart-add-button {
                display: block;
                width: calc(100% - 32px);
                height: 34px;
                margin: 8px auto 0;
                padding: 0 10px;
                border: 1px solid #b89c52;
                border-radius: 7px;
                background: #630000;
                color: #fff;
                font-family: 'Cormorant Garamond', serif;
                font-size: 14px;
                line-height: 1;
                letter-spacing: .3px;
                cursor: pointer;
                box-sizing: border-box;
            }

            .cart-add-button.in-cart {
                background: #f2eee5;
                color: #630000;
                cursor: default;
            }

            .product-cart-button {
                width: 100%;
                margin-top: 15px;
            }
        `;

        document.head.appendChild(style);
    }

    return {
        init,
        add,
        remove,
        clear,
        has,
        getItems,
        getCount,
        getTotal,
        open,
        checkout,
        close,
        render,
        refreshUI
    };
})();

document.addEventListener("DOMContentLoaded", () => Cart.init());
