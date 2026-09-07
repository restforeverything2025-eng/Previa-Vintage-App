/* =========================================
   PREVIA Configuration
========================================= */

const Config = {

    siteName: "PREVIA",

    siteUrl:
        window.location.origin +
        window.location.pathname,

    currency: "€",

    telegramUsername: "Ad_astra_per_astera",

    /*
    Public Core endpoint configuration.
    Never place a secret or signing key in the frontend.
    The production URL will be supplied here when Core is deployed.
    */
    coreOrderApiUrl: "https://previa-core.onrender.com/api/orders"

};

/* =========================================
   Related Products
========================================= */

const RELATED_PRODUCTS_COUNT = 9;

/* =========================================
   Core Order Integration Modules
========================================= */

const orderClientScript =
document.createElement("script");

orderClientScript.src = "OrderClient.js";
orderClientScript.async = false;

document.head.appendChild(orderClientScript);

const orderIntegrationScript =
document.createElement("script");

orderIntegrationScript.src = "OrderIntegration.js";
orderIntegrationScript.async = false;

document.head.appendChild(orderIntegrationScript);
