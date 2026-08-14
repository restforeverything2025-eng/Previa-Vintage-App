/**
 * ============================================================
 * PREVIA
 * OrderModal.js
 *
 * Responsibility:
 * - Build an order inside one modal window.
 * - Manage selected products.
 * - Find additional products by SKU.
 * - Collect customer data.
 * - Manage order steps.
 *
 * Does NOT:
 * - Create orders in CMS yet.
 * - Modify Google Sheets.
 * - Handle delivery.
 * - Handle Monobank integration.
 * ============================================================
 */

const OrderModal = (() => {

    const MAX_ITEMS = 3;

    const PRODUCT_API_URL =
        "https://script.google.com/macros/s/AKfycbxWHGxRB3Edb5_cMZocgqswx7I_y4KKCb67RwTVYBMoqoTCvLTTXXOmsmGw9af3i2I8Fg/exec";


    let modal = null;

    let items = [];

    let currentStep = 1;


    /*
    =========================================
    Create Modal
    =========================================
    */

    function createModal() {

        if (modal) {

            return;

        }


        modal =
            document.createElement("div");

        modal.id =
            "order-modal";

        modal.className =
            "order-modal hidden";


        modal.innerHTML = `

            <div class="order-window">

                <button
                    type="button"
                    class="order-close"
                    aria-label="Close"
                >
                    ×
                </button>

                <div class="order-header">

                    <div class="order-eyebrow">
                        PREVIA ORDER
                    </div>

                </div>


                <div
                    class="order-step"
                    data-step="1"
                >

                    <div class="order-step-title">
                        Ваше замовлення
                    </div>

                    <div
                        class="order-items"
                    ></div>


                    <div
                        class="order-add-product hidden"
                    >

                        <input
                            type="text"
                            class="order-sku-input"
                            placeholder="Введіть Product Code"
                            autocomplete="off"
                        >

                        <button
                            type="button"
                            class="order-add-product-btn"
                        >
                            ДОДАТИ
                        </button>

                        <div
                            class="order-sku-message"
                            aria-live="polite"
                        ></div>

                    </div>


                    <button
                        type="button"
                        class="order-add-btn"
                    >
                        + ДОДАТИ ЩЕ
                    </button>


                    <button
                        type="button"
                        class="order-continue-btn"
                    >
                        ПРОДОВЖИТИ
                    </button>

                </div>


                <div
                    class="order-step hidden"
                    data-step="2"
                >

                    <div class="order-step-title">
                        Дані покупця
                    </div>


                    <form
                        id="order-form"
                        class="order-form"
                    >

                        <label>
                            Ваше ім'я

                            <input
                                type="text"
                                name="customer_name"
                                autocomplete="name"
                                required
                            >
                        </label>


                        <label>
                            Телефон

                            <input
                                type="tel"
                                name="phone"
                                autocomplete="tel"
                                placeholder="+380..."
                                required
                            >
                        </label>


                        <label>
                            Email

                            <input
                                type="email"
                                name="email"
                                autocomplete="email"
                                required
                            >
                        </label>


                        <label>
                            Спосіб оплати

                            <select
                                name="payment_method"
                                required
                            >

                                <option value="">
                                    Оберіть спосіб
                                </option>

                                <option value="fop_details">
                                    Оплата за реквізитами ФОП
                                </option>

                                <option
                                    value="monobank_installments"
                                    disabled
                                >
                                    Оплата частинами — Monobank (незабаром)
                                </option>

                            </select>

                        </label>


                        <div class="order-form-actions">

                            <button
                                type="button"
                                class="order-back-btn"
                            >
                                НАЗАД
                            </button>


                            <button
                                type="submit"
                                class="order-submit-btn"
                            >
                                ЗАМОВИТИ
                            </button>

                        </div>

                    </form>

                </div>


                <div
                    class="order-step hidden"
                    data-step="3"
                >

                    <div class="order-success">

                        <div class="order-success-title">
                            ДЯКУЄМО
                        </div>

                        <div class="order-success-text">
                            Ваше замовлення прийнято.
                        </div>

                        <div class="order-success-note">
                            Ми зв'яжемося з вами найближчим часом.
                        </div>

                        <button
                            type="button"
                            class="order-success-close"
                        >
                            ЗАКРИТИ
                        </button>

                    </div>

                </div>

            </div>

        `;


        document.body.appendChild(
            modal
        );


        bindEvents();

    }


    /*
    =========================================
    Bind Events
    =========================================
    */

    function bindEvents() {

        const closeButton =
            modal.querySelector(
                ".order-close"
            );


        closeButton.addEventListener(
            "click",
            close
        );


        modal.addEventListener(
            "click",
            event => {

                if (
                    event.target === modal
                ) {

                    close();

                }

            }
        );


        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Escape" &&
                    !modal.classList.contains("hidden")
                ) {

                    close();

                }

            }
        );


        modal
            .querySelector(
                ".order-add-btn"
            )
            .addEventListener(
                "click",
                showAddProduct
            );


        modal
            .querySelector(
                ".order-add-product-btn"
            )
            .addEventListener(
                "click",
                addProductBySku
            );


        modal
            .querySelector(
                ".order-sku-input"
            )
            .addEventListener(
                "keydown",
                event => {

                    if (
                        event.key === "Enter"
                    ) {

                        event.preventDefault();

                        addProductBySku();

                    }

                }
            );


        modal
            .querySelector(
                ".order-continue-btn"
            )
            .addEventListener(
                "click",
                goToCustomerStep
            );


        modal
            .querySelector(
                ".order-back-btn"
            )
            .addEventListener(
                "click",
                goToProductsStep
            );


        modal
            .querySelector(
                "#order-form"
            )
            .addEventListener(
                "submit",
                handleSubmit
            );


        modal
            .querySelector(
                ".order-success-close"
            )
            .addEventListener(
                "click",
                close
            );

    }


    /*
    =========================================
    Open
    =========================================
    */

    function open(product) {

        createModal();


        if (!product) {

            console.error(
                "OrderModal.open(): product is required."
            );

            return;

        }


        items = [
            product
        ];


        currentStep = 1;


        resetForm();

        render();


        modal.classList.remove(
            "hidden"
        );


        document.body.classList.add(
            "order-modal-open"
        );

    }


    /*
    =========================================
    Close
    =========================================
    */

    function close() {

        if (!modal) {

            return;

        }


        modal.classList.add(
            "hidden"
        );


        document.body.classList.remove(
            "order-modal-open"
        );

    }


    /*
    =========================================
    Render
    =========================================
    */

    function render() {

        renderItems();

        renderSteps();

    }


    /*
    =========================================
    Render Items
    =========================================
    */

    function renderItems() {

        const container =
            modal.querySelector(
                ".order-items"
            );


        container.innerHTML = "";


        items.forEach(
            (product, index) => {

                const item =
                    document.createElement(
                        "div"
                    );

                item.className =
                    "order-item";


                item.innerHTML = `

                    <div class="order-item-number">
                        ${index + 1}
                    </div>

                    <div class="order-item-info">

                        <div class="order-item-name">
                            ${escapeHtml(
                                product.name || ""
                            )}
                        </div>

                        <div class="order-item-brand">

    ${escapeHtml(
        product.brand || ""
    )}

    · Product Code
    ${formatProductCode(product.sku)}

</div>

                    </div>

                    <div class="order-item-price">
                        ${escapeHtml(
                            product.currency || ""
                        )}
                        ${product.price ?? ""}
                    </div>

                    ${
                        index > 0
                            ? `
                                <button
                                    type="button"
                                    class="order-item-remove"
                                    data-sku="${escapeHtml(
                                        product.sku || ""
                                    )}"
                                    aria-label="Remove product"
                                >
                                    ×
                                </button>
                            `
                            : ""
                    }

                `;


                container.appendChild(
                    item
                );

            }
        );


        container
            .querySelectorAll(
                ".order-item-remove"
            )
            .forEach(
                button => {

                    button.addEventListener(
                        "click",
                        () => {

                            removeProduct(
                                button.dataset.sku
                            );

                        }
                    );

                }
            );


        const addButton =
            modal.querySelector(
                ".order-add-btn"
            );


        if (
            items.length >= MAX_ITEMS
        ) {

            addButton.classList.add(
                "hidden"
            );

        } else {

            addButton.classList.remove(
                "hidden"
            );

        }

    }


    /*
    =========================================
    Render Steps
    =========================================
    */

    function renderSteps() {

        modal
            .querySelectorAll(
                ".order-step"
            )
            .forEach(
                step => {

                    const stepNumber =
                        Number(
                            step.dataset.step
                        );


                    if (
                        stepNumber === currentStep
                    ) {

                        step.classList.remove(
                            "hidden"
                        );

                    } else {

                        step.classList.add(
                            "hidden"
                        );

                    }

                }
            );

    }


    /*
    =========================================
    Show Add Product
    =========================================
    */

    function showAddProduct() {

        const addBox =
            modal.querySelector(
                ".order-add-product"
            );


        addBox.classList.remove(
            "hidden"
        );


        const input =
            modal.querySelector(
                ".order-sku-input"
            );


        input.value = "";


        setSkuMessage(
            ""
        );


        input.focus();

    }


    /*
    =========================================
    Add Product By SKU
    =========================================
    */

    async function addProductBySku() {

        const input =
            modal.querySelector(
                ".order-sku-input"
            );


        const sku =
            input.value.trim();


        if (!sku) {

            setSkuMessage(
                "Введіть Product Code."
            );

            input.focus();

            return;

        }

const normalizedSku =
    sku
        .toLowerCase()
        .replace(/-/g, "");


if (
    items.some(
        item =>
            String(item.sku || "")
                .toLowerCase()
                .replace(/-/g, "") ===
            normalizedSku
    )
) {

    setSkuMessage(
        "Цей товар вже доданий до замовлення."
    );

    input.focus();

    return;

}

        if (
            items.length >= MAX_ITEMS
        ) {

            setSkuMessage(
                "Можна додати максимум 3 товари."
            );

            return;

        }


        setSkuMessage(
            "Пошук товару..."
        );


        const button =
            modal.querySelector(
                ".order-add-product-btn"
            );


        button.disabled = true;


        try {

            const product =
    findProductBySku(
        sku
    );


            if (!product) {

                setSkuMessage(
                    "Товар за цим Product Code не знайдено. Перевірте код."
                );

                input.focus();

                return;

            }


            items.push(
                product
            );


            renderItems();


            input.value = "";


            setSkuMessage(
                "Товар додано."
            );


        } catch (error) {

            console.error(
                "OrderModal.addProductBySku():",
                error
            );


            setSkuMessage(
                "Не вдалося знайти товар. Спробуйте ще раз."
            );

        } finally {

            button.disabled = false;

        }

    }


    /*
    =========================================
    Find Product By SKU
    =========================================
    */

    /*
=========================================
Find Product By Product Code
=========================================
*/

function findProductBySku(productCode) {

    const normalizedCode =
        String(productCode)
            .trim()
            .toLowerCase()
            .replace(/-/g, "");


    if (!normalizedCode) {

        return null;

    }


    const product =
        products.find(
            item =>

                String(item.sku || "")
                    .toLowerCase()
                    .replace(/-/g, "") ===
                normalizedCode
        );


    return product || null;

}

    /*
    =========================================
    Remove Product
    =========================================
    */

    function removeProduct(sku) {

        items =
            items.filter(
                item => item.sku !== sku
            );


        renderItems();

    }


    /*
    =========================================
    Continue To Customer
    =========================================
    */

    function goToCustomerStep() {

        if (
            items.length === 0
        ) {

            return;

        }


        currentStep = 2;


        renderSteps();


        const firstInput =
            modal.querySelector(
                'input[name="customer_name"]'
            );


        if (firstInput) {

            firstInput.focus();

        }

    }


    /*
    =========================================
    Back To Products
    =========================================
    */

    function goToProductsStep() {

        currentStep = 1;


        renderSteps();

    }


    /*
    =========================================
    Submit
    =========================================
    */

    function handleSubmit(event) {

        event.preventDefault();


        const form =
            event.currentTarget;


        if (
            !form.checkValidity()
        ) {

            form.reportValidity();

            return;

        }


        const formData =
            new FormData(form);


        const orderDraft = {

            items:

                items.map(
                    product => ({

                        sku:
                            product.sku || "",

                        productName:
                            product.name || "",

                        brand:
                            product.brand || "",

                        price:
                            Number(
                                product.price || 0
                            ),

                        currency:
                            product.currency || ""

                    })
                ),

            customer_name:
                formData.get(
                    "customer_name"
                ),

            phone:
                formData.get(
                    "phone"
                ),

            email:
                formData.get(
                    "email"
                ),

            payment_method:
                formData.get(
                    "payment_method"
                )

        };


        console.log(
            "PREVIA Order Builder:",
            orderDraft
        );


        currentStep = 3;


        renderSteps();

    }


    /*
    =========================================
    Reset Form
    =========================================
    */

    function resetForm() {

        const form =
            modal.querySelector(
                "#order-form"
            );


        if (form) {

            form.reset();

        }


        const addBox =
            modal.querySelector(
                ".order-add-product"
            );


        if (addBox) {

            addBox.classList.add(
                "hidden"
            );

        }


        setSkuMessage(
            ""
        );

    }


    /*
    =========================================
    SKU Message
    =========================================
    */

    function setSkuMessage(message) {

        if (!modal) {

            return;

        }


        const element =
            modal.querySelector(
                ".order-sku-message"
            );


        if (element) {

            element.textContent =
                message;

        }

    }

/*
=========================================
Format Product Code
=========================================
*/

function formatProductCode(sku) {

    const value =
        String(sku || "").trim();


    if (!value) {

        return "";

    }


    if (value.length < 2) {

        return value;

    }


    return (
        value.substring(0, 1) +
        "-" +
        value.substring(1)
    );

}

    /*
    =========================================
    Escape HTML
    =========================================
    */

    function escapeHtml(value) {

        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");

    }


    /*
    =========================================
    Public API
    =========================================
    */

    return {

        open,

        close

    };

})();