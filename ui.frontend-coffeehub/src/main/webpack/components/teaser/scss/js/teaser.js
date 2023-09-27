const QUERY = {
    HERO_BANNER: ".cmp-teaser--hero-banner",
    TEASER: ".cmp-teaser",
    IMAGE: ".cmp-teaser__image",
    CONTENT: ".cmp-teaser__content",
    HEADER: ".cmp-experiencefragment--header",
};

function changeTeaserHeight(teaser) {
    if (teaser) {
        const newHeight = parseInt(teaser.querySelector(QUERY.CONTENT).offsetHeight) + 400;
        teaser.style.height = newHeight.toString() + "px";
    }
}

function onDocumentReady() {
    window.addEventListener("resize", function () {
        if (!document.cookie.includes("wcmmode=edit") && !document.cookie.includes("wcmmode=design") && !document.cookie.includes("wcmmode=preview")) {
            onDocumentReady();
        }
    });
    const heroBanner = document.querySelectorAll(QUERY.HERO_BANNER);
    const header = document.querySelector(QUERY.HEADER);
    if (heroBanner.length > 0) {
        heroBanner.forEach(element => {
            const teaser = element.querySelector(QUERY.TEASER);
            if (teaser) {
                teaser.style.height = window.innerHeight + "px";
                if (header) {
                    if ((parseInt(teaser.querySelector(QUERY.CONTENT).offsetHeight) + parseInt(header.offsetHeight)) >= parseInt(teaser.querySelector(QUERY.IMAGE).offsetHeight)) {
                        changeTeaserHeight(teaser);
                    }
                }
            }
        });
    }
}

if (document.readyState !== "loading") {
    onDocumentReady();
} else {
    document.addEventListener("DOMContentLoaded", onDocumentReady);
}
