const QUERY = {
    DEFAULT_MULTIMEDIA: ".cmp-multimedia-default",
    IMAGE: ".cmp-image",
    MULTIMEDIA: ".cmp-multimedia",
    VIDEO: ".cmp-multimedia--video",
    SRC_VIDEO: ".video",
    BUTTON: ".cmp-teaser__action-link",
    TEASER: ".cmp-teaser",
    SECONDARY_IMAGE: ".cmp-teaser__image-secondary-image",
    TEASER_IMAGE: ".cmp-teaser__image",
    IMAGE_IMAGE: ".cmp-image__image",
};

const BREAKPOINT_MD = 769;

function isInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function setTeaserHeightonLoad(imageElement, element) {
    if (imageElement) {
        const teaser = element.querySelector(QUERY.TEASER);
        const video = element.querySelector(QUERY.SRC_VIDEO);
        const multimediaelement = element.querySelector(QUERY.MULTIMEDIA);
        if (parseInt(imageElement.clientHeight) > 0) {
            teaser.style.height = imageElement.clientHeight + "px";
            if (video) {
                if (video["firstElementChild"].getAttribute('src')) {
                    video.style.height = imageElement.clientHeight + "px";
                    video.style.backgroundColor = "#000";
                }
            }
            if (multimediaelement.querySelector(QUERY.SECONDARY_IMAGE)) {
                multimediaelement.querySelector(QUERY.SECONDARY_IMAGE).style.height = imageElement.clientHeight + "px";
            }
        }
    }
}

function mouseEnter() {
    const imageElement = this.querySelector(QUERY.IMAGE);
    setTeaserHeightonLoad(imageElement, this);
    const multimediaelement = this.querySelector(QUERY.MULTIMEDIA);
    const hoverImagePath =
        multimediaelement["firstElementChild"]["dataset"]["hoverImage"];
    const hoverVideoPath =
        multimediaelement["firstElementChild"]["dataset"]["hoverVideo"];
    if (hoverImagePath || hoverVideoPath) {
        if (hoverVideoPath) {
            multimediaelement.querySelector(QUERY.SECONDARY_IMAGE).style.display = "none";
            multimediaelement.querySelector(QUERY.SRC_VIDEO).play();
        }
    }
    else{
        multimediaelement.querySelector(QUERY.IMAGE_IMAGE).style.opacity = "1";
        multimediaelement.querySelector(QUERY.IMAGE_IMAGE).style.filter = "brightness(150%)";
    }
}

function onClickNavigation() {
    window.location.href = this.querySelector(QUERY.BUTTON).getAttribute("href");
}

function mouseLeave() {
    const multimediaelement = this.querySelector(QUERY.MULTIMEDIA);
    const hoverVideoPath =
        multimediaelement["firstElementChild"]["dataset"]["hoverVideo"];
    const hoverImagePath =
        multimediaelement["firstElementChild"]["dataset"]["hoverImage"];
        if (hoverVideoPath) {
        multimediaelement.querySelector(QUERY.SRC_VIDEO).pause();
        multimediaelement.querySelector(QUERY.SRC_VIDEO).currentTime = 0;
    }
    if(!hoverImagePath && !hoverVideoPath){
        multimediaelement.querySelector(QUERY.IMAGE_IMAGE).style.filter = "brightness(100%)";  
    }
}

function onDocumentReady() {
    const defaultelements = document.querySelectorAll(QUERY.DEFAULT_MULTIMEDIA);
    if(defaultelements) {
        window.addEventListener("resize", onDocumentReady);
        defaultelements.forEach(element => {
            const imageElement = element.querySelector(QUERY.IMAGE);
            setTeaserHeightonLoad(imageElement, element);
            document.addEventListener("scroll", () => {
                // This function ensures the smooth hover effect for the images that are inviewport
                if (imageElement && isInViewport(imageElement)) {
                    setTeaserHeightonLoad(imageElement, element);
                }
            });
            element.removeEventListener("mouseenter", mouseEnter);
            element.removeEventListener("mouseleave", mouseLeave);

            if (element && window.innerWidth >= BREAKPOINT_MD) {
                element.addEventListener("mouseenter", mouseEnter);
                element.addEventListener("mouseleave", mouseLeave);
            }
            if (element) {
                element.addEventListener("click", onClickNavigation);
            }
        });
    }
}

if (document.readyState !== "loading") {
    onDocumentReady();
} else {
    document.addEventListener("DOMContentLoaded", onDocumentReady);
}
