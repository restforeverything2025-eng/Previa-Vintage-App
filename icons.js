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

    getHeart() {

    return `

        <svg
             width="20"
             height="20"
             viewBox="0 0 24 24"
             fill="none"
             xmlns="http://www.w3.org/2000/svg"
         >

             <path
             d="M12 21s-6.7-4.35-9.33-8.02C.83 10.43 2.1 6.8 5.8 5.62c2.08-.66 4.18.1 5.2 1.74 1.02-1.64 3.12-2.4 5.2-1.74 3.7 1.18 4.97 4.81 3.13 7.36C18.7 16.65 12 21 12 21z"
             stroke="currentColor"
             stroke-width="1.8"
             stroke-linecap="round"
             stroke-linejoin="round"
         />

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