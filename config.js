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
    */
    coreOrderApiUrl: "https://previa-core.onrender.com/api/orders",
    coreCustomerApiUrl: "https://previa-core.onrender.com/api/customer",
    coreFavoritesApiUrl: "https://previa-core.onrender.com/api/favorites",

    /*
    Telegram Login OIDC configuration for the standalone Web app.
    The Client ID is public and is safe to expose in frontend code.
    Never place the Telegram Client Secret or bot token here.
    */
    telegramOidcClientId: "8970735353"

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
