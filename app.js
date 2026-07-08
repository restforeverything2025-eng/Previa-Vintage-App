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

        button.style.display = "flex";

    } else {

        button.style.display = "none";

    }

});

/* =========================================
   Application Initialization
========================================= */

Favorites.init();

    document.getElementById("backBtn").innerHTML =
    Icons.getBack();

    document.getElementById("scrollTopBtn").innerHTML =
    Icons.getUp();

    document.getElementById("lightboxPrev").innerHTML =
    Icons.getBack();

    document.getElementById("lightboxNext").innerHTML =
    Icons.getNext();

    document.getElementById("lightboxClose").innerHTML =
    Icons.getClose();
      
initializeHome();

const params = new URLSearchParams(window.location.search);

const productId = params.get("product");

if (productId) {

    showProduct(productId);

}
