/*
=========================================================
PREVIA Icons
Version: 1.0
Status: Development
=========================================================
*/

const Icons = {

    /* =========================================
   Navigation
========================================= */

    getBack(className = "") {

    return `
        <svg
            class="${className}"
            xmlns="http://www.w3.org/2000/svg"
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2.2"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path d="M15 18l-6-6 6-6"/>
            </svg>
        `;

    },

    getUp() {

    return `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path d="M18 15l-6-6-6 6"/>
        </svg>
    `;

},

    getNext() {

    return `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path d="M9 18l6-6-6-6"/>
        </svg>
    `;

},

    getShare(className = "") {

    return `
        <svg
            class="${className}"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path d="M7 17L17 7"/>
            <path d="M10 7h7v7"/>
        </svg>
    `;

},

/* =========================================
   Actions
========================================= */

    getClose() {

    return `
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2.2"
            stroke-linecap="round"
            stroke-linejoin="round"
        >
            <path d="M6 6l12 12"/>
            <path d="M18 6L6 18"/>
        </svg>
    `;

}

};