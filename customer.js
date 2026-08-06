/*
==================================================
PREVIA

customer.js

Customer Module

Responsibility:
- Represent a PREVIA customer.
- Create customer objects.
- Validate customer objects.
==================================================
*/

const Customer = (() => {

    function create({

        provider,

        id,

        name

    }) {

        return Object.freeze({

            provider,

            id,

            name

        });

    }

    function isCustomer(value) {

        return (

            value !== null &&
            typeof value === "object" &&
            value.provider !== undefined &&
            value.id !== undefined &&
            value.name !== undefined

        );

    }

    return {

        create,

        isCustomer

    };

})();