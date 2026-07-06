/* =========================================
   Product State
========================================= */

let currentProduct = null;
let currentCategory = null;

let currentImages = [];
let currentImageIndex = 0;

/* =========================================
   Touch Navigation
========================================= */

let touchStartX = 0;
let touchEndX = 0;

function scrollToTop() {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

function scrollToCatalog() {

    document.getElementById(
        "search-container"
    ).scrollIntoView({

        behavior: "smooth",

        block: "start"

    });

}

document.addEventListener("keydown", function(event){

    const lightbox =
        document.getElementById("lightbox");

    if(lightbox.style.display !== "flex"){

        return;

    }

    if(event.key === "Escape"){

        closeLightbox();

    }

    if(event.key === "ArrowLeft"){

    previousImage();

}

if(event.key === "ArrowRight"){

    nextImage();

}

});

window.addEventListener("scroll", function() {

    const button = document.getElementById("scrollTopBtn");

    if(window.scrollY > 300) {

        button.style.display = "block";

    } else {

        button.style.display = "none";

    }

});