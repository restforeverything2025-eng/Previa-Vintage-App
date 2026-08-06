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

    function connect() {

    const customer = Customer.create({

    provider: "telegram",

    id: "demo-user",

    name: "Demo Customer"

});

Identity.setCurrent(customer);

    console.log("Telegram connected.");

}

    return {
        connect
    };

})();