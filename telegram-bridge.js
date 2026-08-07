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

const customer =
    await CustomerClient.getOrCreateCustomer(

        "telegram",

        String(user.id),

        displayName

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