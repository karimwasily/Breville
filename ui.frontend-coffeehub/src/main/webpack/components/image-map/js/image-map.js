
const QUERY = {
    IMAGE_MAP: ".image-map",
    FOCUSPOINT_DESKTOP: ".cmp-focuspoint-desktop",
    FOCUSPOINT_MOBILE: ".cmp-focuspoint-mobile",
};

const BREAKPOINT_MD = 768;



function onDocumentReady() {
    const isDesktopView = window.innerWidth >= BREAKPOINT_MD;
    const images = document.querySelectorAll(QUERY.IMAGE_MAP);
    if(images) {
        window.addEventListener("resize", onDocumentReady);
        images.forEach(img => {
            img.querySelector(QUERY.FOCUSPOINT_MOBILE).style.display = isDesktopView ? "none" : "inline";
            img.querySelector(QUERY.FOCUSPOINT_DESKTOP).style.display = isDesktopView ? "inline" : "none";
        });
    }
}

if (document.readyState !== "loading") {
    onDocumentReady();
} else {
    document.addEventListener("DOMContentLoaded", onDocumentReady);
}
