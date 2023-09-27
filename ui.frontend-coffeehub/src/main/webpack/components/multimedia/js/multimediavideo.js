const QUERY = {
    HOME: ".cmp-multimedia-home",
    VIDEO: ".video",
    MULTIMEDIA_VIDEO: ".cmp-multimedia--video",
    BUTTON: ".cmp-teaser__action-link",
    IMAGE: ".cmp-image",
    CONTENT: ".cmp-teaser__content",
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

function playVideo() {
    this.querySelector(QUERY.VIDEO).play();
}

function pauseVideo() {
    this.querySelector(QUERY.VIDEO).pause();
    this.querySelector(QUERY.VIDEO).currentTime = 0;
}

function ctaNavigation() {
    window.location.href = this.querySelectorAll(QUERY.BUTTON)[1].getAttribute("href");
}

function playVideoOnScroll() {
    const videoElements = document.querySelectorAll(QUERY.HOME);
    videoElements.forEach(element => {
        const videoTile = element.querySelectorAll(QUERY.VIDEO)[1];
        const elementInViewPort = isInViewport(videoTile);
        if (elementInViewPort) {
            videoTile.play();
        } else {
            videoTile.pause();
            videoTile.currentTime = 0;
        }
    });
}

function onDocumentReady() {
    const videoElements = document.querySelectorAll(QUERY.HOME);
    if (videoElements.length) {
        window.addEventListener("resize", onDocumentReady);
        videoElements.forEach(element => {
            // Index 1 is needed so that we can grab MULTIMEDIA_VIDEO and VIDEO for homepage Markup 
            const videoElement = element.querySelectorAll(QUERY.MULTIMEDIA_VIDEO)[1];
            const videotile = element.querySelectorAll(QUERY.VIDEO)[1];
            videoElement.removeEventListener("mouseenter", playVideo);
            videoElement.removeEventListener("mouseleave", pauseVideo);
            videotile.pause();
            videotile.currentTime = 0;
            element.removeEventListener("click", ctaNavigation);
            document.removeEventListener("scroll", playVideoOnScroll);
            const imgElement = element.querySelector(QUERY.IMAGE);
            if (imgElement) {
                imgElement.innerHTML = "";
            }
            videoElement.style.display = "inline";
            if (window.innerWidth >= BREAKPOINT_MD) {
                videoElement.addEventListener("mouseenter", playVideo);
                videoElement.addEventListener("mouseleave", pauseVideo);
                element.addEventListener("click", ctaNavigation);
                
                /* if (videotile && videoElement) {
                    // setTimeout needed for AEM lazy loading 
                    setTimeout(() => {
                        if (videoElement.querySelector(QUERY.CONTENT).offsetHeight >= videotile.clientHeight) {
                            videotile.style.height = videoElement.querySelector(QUERY.CONTENT).offsetHeight + "px";
                            videotile.style.backgroundColor = "#000";
                        }
                        else {
                            videotile.style.height = "unset";
                        }
                    }, 1000);
                } */

            } else {
                document.addEventListener("scroll", playVideoOnScroll);
            }         
        });
    }
}

if (document.readyState !== "loading") {
    onDocumentReady();
} else {
    document.addEventListener("DOMContentLoaded", onDocumentReady);
}
