/*
==================================================
PREVIA

telegram-bridge.js

Telegram Bridge

Responsibility:
- Communicate with Telegram.
- Convert Telegram data into PREVIA Identity.
- Never contain business logic.
==================================================
*/

const TelegramBridge = (() => {

    async function connect() {

        const customer =
            await CustomerClient.getOrCreateCustomer(

                "telegram",

                "demo-user",

                "Demo Customer"

            );

        const identity =
            Customer.create({

                provider:
                    customer.provider,

                id:
                    customer.providerId,

                name:
                    customer.displayName

            });

        Identity.setCurrent(identity);

        console.log(
            "Telegram connected."
        );

        return identity;

    }

    return {
        connect
    };

})();