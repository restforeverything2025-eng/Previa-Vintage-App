/*
==================================================
PREVIA

OrderIntegration.js

Checkout integration layer.

Responsibility:
- Intercept the existing OrderModal submit event.
- Build the trusted client-side checkout payload.
- Send it through OrderClient to PREVIA Core.
- Clear Cart only after Core confirms success.
- Keep the same idempotency key when a retry is needed.

Does NOT:
- Contain API secrets.
- Trust client price/title as authoritative.
- Generate providerId.
- Write directly to CMS.
==================================================
*/

(() => {

    let submitting = false;

    function getVisibleOrderModal() {

        const modal =
            document.getElementById("order-modal");

        if (!modal || modal.classList.contains("hidden")) {
            return null;
        }

        return modal;

    }

    function getSubmitButton(modal) {
        return modal.querySelector(".order-submit-btn");
    }

    function setSubmitting(modal, value) {

        submitting = value;

        const button = getSubmitButton(modal);

        if (!button) {
            return;
        }

        button.disabled = value;
        button.textContent = value
            ? "ОБРОБКА..."
            : "ЗАМОВИТИ";

    }

    function setError(modal, message) {

        let element =
            modal.querySelector(".order-submit-message");

        if (!element) {

            element = document.createElement("div");
            element.className = "order-submit-message";
            element.setAttribute("role", "alert");
            element.setAttribute("aria-live", "polite");

            const form =
                modal.querySelector("#order-form");

            if (form) {
                form.appendChild(element);
            }

        }

        element.textContent = message;

    }

    function clearError(modal) {

        const element =
            modal.querySelector(".order-submit-message");

        if (element) {
            element.textContent = "";
        }

    }

    function showSuccess(modal) {

        const steps =
            modal.querySelectorAll(".order-step");

        steps.forEach(step => {
            step.classList.toggle(
                "hidden",
                Number(step.dataset.step) !== 3
            );
        });

    }

    function buildDraft(form) {

        const formData = new FormData(form);

        const products =
            typeof Cart !== "undefined" &&
            typeof Cart.getItems === "function"
                ? Cart.getItems()
                : [];

        return {

            customer_name:
                formData.get("customer_name"),

            phone:
                formData.get("phone"),

            contact_preferences:
                formData.getAll("contact_preferences"),

            email:
                formData.get("email"),

            payment_method:
                formData.get("payment_method"),

            items:
                products.map(product => ({
                    sku: product.sku || "",
                    quantity: 1
                }))

        };

    }

    async function handleSubmit(event) {

        const form = event.target;

        if (!form || form.id !== "order-form") {
            return;
        }

        const modal = getVisibleOrderModal();

        if (!modal) {
            return;
        }

        /*
        This listener runs in capture phase, before the prototype
        OrderModal submit handler. It becomes the real checkout path.
        */
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        if (submitting) {
            return;
        }

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        clearError(modal);
        setSubmitting(modal, true);

        try {

            const draft = buildDraft(form);
            const result =
                await OrderClient.createOrder(draft);

            if (
                typeof Cart !== "undefined" &&
                typeof Cart.clear === "function"
            ) {
                Cart.clear();
            }

            showSuccess(modal);

            if (
                typeof OrderClient.resetCheckoutAttempt ===
                "function"
            ) {
                OrderClient.resetCheckoutAttempt();
            }

            console.log(
                "PREVIA Order created:",
                result
            );

        } catch (error) {

            console.error(
                "PREVIA Order submission failed:",
                error
            );

            const message =
                error?.code === "IDEMPOTENCY_CONFLICT"
                    ? "Цей запит уже використано для іншого замовлення. Почніть оформлення ще раз."
                    : error?.code === "AUTHENTICATION_ERROR"
                        ? "Не вдалося підтвердити Telegram. Відкрийте PREVIA з Telegram та спробуйте ще раз."
                        : "Не вдалося оформити замовлення. Спробуйте ще раз трохи пізніше.";

            setError(modal, message);

        } finally {
            setSubmitting(modal, false);
        }

    }

    document.addEventListener(
        "submit",
        handleSubmit,
        true
    );

})();
