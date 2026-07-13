/* =========================================
   Share Module
========================================= */

const Share = {

    getProductData(product) {

        return {

    id: product.id,

    sku: product.sku,

    category: product.category,

    brand: product.brand,

    name: product.name,

    price: formatPrice(product),

    status: product.status,

    image: product.images[0],

    url: `${Config.siteUrl}?product=${product.id}`

};

},

    getShareMessage(data) {

    return `Відкрийте для себевінтажний скарб у PREVIA.

${data.name}

🏷️ Brand: ${data.brand}
📂 Category: ${data.category}
🔖 Product Code: ${data.sku}

Дізнайтеся більше ↓`;

},

    canShare() {

    return (
        window.isSecureContext &&
        typeof navigator.share === "function"
    );

},

    canCopy() {

    return (
        window.isSecureContext &&
        navigator.clipboard &&
        typeof navigator.clipboard.writeText === "function"
    );

},

    async shareProduct(product) {

    const data = this.getProductData(product);

    if (!this.canShare()) {

    this.copyLink(data.url);

    return;

    }

    try {

        await navigator.share({

            title: data.name,

            text: this.getShareMessage(data),

            url: data.url

        });

    } catch (error) {

        console.log("Share cancelled.", error);

    }

},

    shareToTelegram(product) {

    const data = this.getProductData(product);

    const message = this.getShareMessage(data);

    const telegramUrl =
        `https://t.me/share/url?url=${encodeURIComponent(data.url)}&text=${encodeURIComponent(message)}`;

    window.open(telegramUrl, "_blank");

},

    copyLink(url) {

    if (!this.canCopy()) {

    Toast.show("Не вдалося скопіювати посилання.");

    return;

}

    navigator.clipboard.writeText(url);

    Toast.show("Посилання скопійовано.");

}

};