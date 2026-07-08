/* =========================================
   Share Module
========================================= */

const Share = {

    getProductData(product) {

        return {

            id: product.id,

            sku: product.sku,

            name: product.name,

            price: formatPrice(product),

            url: window.location.href

        };

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

    copyLink(url) {

    if (!this.canCopy()) {

        alert(url);

        return;

    }

    navigator.clipboard.writeText(url);

    alert("Посилання скопійовано.");

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

            text: `${data.name}\n${data.price}`,

            url: data.url

        });

    } catch (error) {

        console.log("Share cancelled.", error);

    }

}

};