/*
==================================================
PREVIA

CustomerClient.js

Customer Client

Responsibility:
- Communicate with PREVIA CMS Customer API.
- Send Customer requests to the Backend.
- Return Customer data to the Frontend.
- Do not contain business logic.
==================================================
*/

const CustomerClient = (() => {

    const API_URL =
        "https://script.google.com/macros/s/AKfycbxWHGxRB3Edb5_cMZocgqswx7I_y4KKCb67RwTVYBMoqoTCvLTTXXOmsmGw9af3i2I8Fg/exec";

    async function getOrCreateCustomer(
        provider,
        providerId,
        displayName
    ) {

        const response =
            await fetch(API_URL, {

                method: "POST",

                headers: {
                    "Content-Type":
                    "text/plain;charset=UTF-8"
     },

                body: JSON.stringify({

                    action:
                        "customer.getOrCreate",

                    data: {

                        provider,

                        providerId,

                        displayName

                    }

                })

            });

        if (!response.ok) {

            throw new Error(
                "Customer API request failed: " +
                response.status
            );

        }

        const result =
            await response.json();

        if (!result.success) {

            throw new Error(
                result.error ||
                "Customer API returned an error."
            );

        }

        return result.customer;

    }

    return {

        getOrCreateCustomer

    };

})();