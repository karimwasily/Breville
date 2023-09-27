const QUERY = {
    HEADER: ".cmp-experiencefragment--header",
    LIST: ".cmp-navigation__group",
    NAVIGATION: ".cmp-navigation",
    IMGAE: ".image",
    CONTAINER: ".cmp-container",
};
const BREAKPOINT_MD = 768;
function onDocumentReady() {
    const header = document.querySelector(QUERY.HEADER);
    if (header) {
        window.addEventListener("resize", onDocumentReady);
        const navigation = header.querySelector(QUERY.NAVIGATION);
        if (navigation) {
            const listWidth = parseInt(navigation.querySelector(QUERY.LIST).offsetWidth);
            const imageWidth = parseInt(header.querySelector(QUERY.IMGAE).offsetWidth);
            const containerWidth = parseInt(header.querySelector(QUERY.CONTAINER).offsetWidth);
        }
    }
}

if (document.readyState !== "loading") {
    onDocumentReady();
} else {
    document.addEventListener("DOMContentLoaded", onDocumentReady);
}
