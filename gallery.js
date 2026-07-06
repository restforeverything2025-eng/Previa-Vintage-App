/*
=========================================================
PREVIA Gallery
Version: 1.0
Status: Development
=========================================================
*/

function changeMainImage(imageSrc) {

    document.getElementById(
        "main-product-image"
    ).src = imageSrc;

}

function openLightbox(images, index = 0) {

    currentImages = images;

    currentImageIndex = index;

    const prevButton =
    document.querySelector(".lightbox-prev");

const nextButton =
    document.querySelector(".lightbox-next");

if(images.length <= 1){

    prevButton.style.display = "none";

    nextButton.style.display = "none";

}else{

    prevButton.style.display = "";

    nextButton.style.display = "";

}

    document.getElementById("lightbox").style.display = "flex";

    document.body.style.overflow = "hidden";

    lightbox.addEventListener("touchstart", handleTouchStart);

    lightbox.addEventListener("touchend", handleTouchEnd);

    document.getElementById("lightbox-image").src =
        currentImages[currentImageIndex];

}

function openCurrentImage() {

    const currentSrc =
        document.getElementById("main-product-image").src;

    currentImageIndex =
        currentImages.findIndex(image =>
            currentSrc.includes(image)
        );

    if (currentImageIndex < 0) {

        currentImageIndex = 0;

    }

    openLightbox(
        currentImages,
        currentImageIndex
    );

}

function closeLightbox() {

    document.getElementById("lightbox").style.display = "none";

    document.body.style.overflow = "";

}

function nextImage() {

    const image =
        document.getElementById("lightbox-image");

    image.classList.add("fade");

    setTimeout(() => {

        currentImageIndex++;

        if(currentImageIndex >= currentImages.length){

            currentImageIndex = 0;

        }

        image.src = currentImages[currentImageIndex];

        image.classList.remove("fade");

    },120);

}

function previousImage() {

    const image =
        document.getElementById("lightbox-image");

    image.classList.add("fade");

    setTimeout(() => {

        currentImageIndex--;

        if(currentImageIndex < 0){

            currentImageIndex =
                currentImages.length - 1;

        }

        image.src =
            currentImages[currentImageIndex];

        image.classList.remove("fade");

    },120);

}

function handleTouchStart(event){

    touchStartX = event.changedTouches[0].screenX;

}

function handleTouchEnd(event){

    touchEndX = event.changedTouches[0].screenX;

    handleSwipe();

}

function handleSwipe(){

    const distance = touchEndX - touchStartX;

    if(Math.abs(distance) < 50){

        return;

    }

    if(distance > 0){

        previousImage();

    }else{

        nextImage();

    }

}

