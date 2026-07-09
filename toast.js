/* =========================================
   Toast Notification Module
========================================= */

const Toast = {

    show(message) {

    const toast = document.getElementById("toast");

    if (!toast) return;

    toast.textContent = message;

    toast.style.opacity = "1";

    clearTimeout(this.timer);

    this.timer = setTimeout(() => {

        toast.style.opacity = "0";

    }, 2200);

}

};

