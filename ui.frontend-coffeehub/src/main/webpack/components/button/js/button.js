function onDocumentReady() {
    const backToTopButton = document.querySelector('.cmp-button--back-to-top .cmp-button');
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function() {
            window.scroll({top: 0, behavior: "smooth"});
        });
    }
}

if (document.readyState !== "loading") {
    onDocumentReady();
} else {
    document.addEventListener("DOMContentLoaded", onDocumentReady);
}
