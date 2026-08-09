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

        const user =
            Telegram.WebApp.initDataUnsafe.user;

        if (!user) {

            throw new Error(
                "Telegram user data is unavailable."
            );

        }

        const displayName =
            [user.first_name, user.last_name]
                .filter(Boolean)
                .join(" ");

        const username =
            user.username || "";

        const customer =
            await CustomerClient.getOrCreateCustomer(

                "telegram",

                String(user.id),

                displayName,

                username

            );

        const identity =
            Customer.create({

                customerId:
                    customer.customerId,

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

    async function restore() {

    const user =
        Telegram.WebApp.initDataUnsafe.user;

    if (!user) {

        throw new Error(
            "Telegram user data is unavailable."
        );

    }

    const customer =
        await CustomerClient.findCustomer(

            "telegram",

            String(user.id)

        );

    if (!customer) {

        return null;

    }

    const identity =
        Customer.create({

            customerId:
                customer.customerId,

            provider:
                customer.provider,

            id:
                customer.providerId,

            name:
                customer.displayName

        });

    Identity.setCurrent(identity);

    console.log(
        "Existing Customer restored."
    );

    return identity;

    }

    return {
    connect,
    restore
    };

})();
