const QUERY = {
    CAROUSEL : ".cmp-recipecarouselmulti__carousel",
    ITEMS : ".cmp-recipecarouselmulti__item",
    BUTTONS : ".cmp-recipecarouselmulti__buttons",
    LEFT_BUTTON : ".cmp-recipecarouselmulti__button--previous",
    RIGHT_BUTTON : ".cmp-recipecarouselmulti__button--next",
    LEFT_MASK : ".cmp-recipecarouselmulti__mask-before",
    RIGHT_MASK: ".cmp-recipecarouselmulti__mask-after"
};

const CLASS = {
    ITEM_PREV :             "cmp-recipecarouselmulti__item--prev",
    ITEM_FADE_LEFT :        "cmp-recipecarouselmulti__item--active--fade-left",
    ITEM_ACTIVE_LEFT :      "cmp-recipecarouselmulti__item--active--left",
    ITEM_ACTIVE_MIDDLE :    "cmp-recipecarouselmulti__item--active--middle",
    ITEM_ACTIVE_RIGHT :     "cmp-recipecarouselmulti__item--active--right",
    ITEM_FADE_RIGHT :       "cmp-recipecarouselmulti__item--active--fade-right",
    ITEM_NEXT :             "cmp-recipecarouselmulti__item--next"
};

const carousels = document.querySelectorAll(QUERY.CAROUSEL);
carousels.forEach(carousel => {
    
    const items = carousel.querySelectorAll(QUERY.ITEMS);
    const totalItems = items.length; 
    const buttons = carousel.parentNode.querySelector(QUERY.BUTTONS);
    const SCREEN_MD_BREAKPOINT = 768;
    let displayOnSlide = (window.innerWidth < SCREEN_MD_BREAKPOINT ? 1 : 3);
    let slide = 0;

    //HELPER FUNCTIONS
    function setHidden(elements) {
        elements.forEach(element => {
            element.style.visibility='hidden';
        });
    }

    function setVisible(elements) {
        elements.forEach(element => {
            element.style.visibility='visible';
        });
    }

    function setInitialClasses() {
        if(totalItems >= 1) {items[0].classList.add(CLASS.ITEM_ACTIVE_LEFT);}
        if(totalItems >= 2) {items[1].classList.add(CLASS.ITEM_ACTIVE_MIDDLE);}
        if(totalItems >= 3) {items[2].classList.add(CLASS.ITEM_ACTIVE_RIGHT);}
        if(totalItems >= 4) {items[3].classList.add(CLASS.ITEM_FADE_RIGHT);}
        if(totalItems >= 5) {items[4].classList.add(CLASS.ITEM_NEXT);}
    }

    function setWrapperHeight() {
        const itemHeight = items[0].clientHeight;
        carousel.style.height = (itemHeight + 'px');
    }

    function clearClass() {
        items.forEach(item => {
            item.classList.remove(  CLASS.ITEM_ACTIVE_LEFT,
                                    CLASS.ITEM_ACTIVE_MIDDLE,
                                    CLASS.ITEM_ACTIVE_RIGHT,
                                    CLASS.ITEM_FADE_LEFT,
                                    CLASS.ITEM_FADE_RIGHT,
                                    CLASS.ITEM_PREV,
                                    CLASS.ITEM_NEXT);
        });
    }

    function moveCarouselTo(slide) {
        if (totalItems >= 4 && slide <= totalItems - displayOnSlide && slide >= 0) {
            clearClass();
            const prev = slide - 2;
            const fadeLeft = slide - 1;
            const activeLeft = slide;
            const activeMid = slide + 1;
            const activeRight = slide + 2;
            const fadeRight = slide + 3;
            const next = slide + 4;

            if(prev >= 0) {
                items[prev].classList.add(CLASS.ITEM_PREV);
            }
            if(fadeLeft >= 0) {
                items[fadeLeft].classList.add(CLASS.ITEM_FADE_LEFT);
            }
            items[activeLeft].classList.add(CLASS.ITEM_ACTIVE_LEFT);
            if(activeMid <= totalItems - 1){
                items[activeMid].classList.add(CLASS.ITEM_ACTIVE_MIDDLE);
            }
            if(activeRight <= totalItems - 1){
                items[activeRight].classList.add(CLASS.ITEM_ACTIVE_RIGHT);
            }
            if(fadeRight <= totalItems - 1) {
                items[fadeRight].classList.add(CLASS.ITEM_FADE_RIGHT);
            }
            if(next <= totalItems - 1) {
                items[next].classList.add(CLASS.ITEM_NEXT);
            }
        }
    }

    // Check current slide and display button
    function displayButton() {
        const leftButton = buttons.querySelector(QUERY.LEFT_BUTTON);
        const rightButton = buttons.querySelector(QUERY.RIGHT_BUTTON);
        const maskLeft = carousel.parentNode.querySelector(QUERY.LEFT_MASK);
        const maskRight = carousel.parentNode.querySelector(QUERY.RIGHT_MASK);

        if(slide === 0) {
            setHidden([leftButton,maskLeft]);
        }
        else {
            setVisible([leftButton,maskLeft]);
        }

        if(slide === totalItems - displayOnSlide) {
            setHidden([rightButton,maskRight]);
        }
        else {
            setVisible([rightButton,maskRight]);
        }
    }

    // Next navigation handler
    function moveNext() {
        if (slide < (totalItems - displayOnSlide)) {
            slide++;
            moveCarouselTo(slide);
            displayButton();
        }
    }

    // Previous navigation handler
    function movePrev() {
        if (slide > 0) {
            slide--;
            moveCarouselTo(slide);
            displayButton();
        }
    }

    // Set click events to navigation buttons
    function setEventListeners(parentNode) {
        const next = parentNode.querySelector(QUERY.RIGHT_BUTTON);
        const prev = parentNode.querySelector(QUERY.LEFT_BUTTON);

        if(next) {next.addEventListener('click', moveNext);}
        if(prev) {prev.addEventListener('click', movePrev);}

        items.forEach(item => {
            item.addEventListener('focus', () => {
                if((item.classList.contains(CLASS.ITEM_FADE_RIGHT) && displayOnSlide === 3)
                || item.classList.contains(CLASS.ITEM_ACTIVE_MIDDLE) && displayOnSlide === 1) {
                    moveNext();
                }
                if(item.classList.contains(CLASS.ITEM_FADE_LEFT)) {
                    movePrev();
                }
            });
        });
    }

    // Initialise carousel
    function initCarousel() {
        setInitialClasses();
        setEventListeners(carousel.parentNode);
        displayButton();
        setWrapperHeight();
        isMoving = false;
        window.addEventListener("resize", () => {
            // Event listner so that heighted can be calculated after the images are loaded
            items[0].addEventListener('loadend', function() {
                setWrapperHeight();
                displayOnSlide = (window.innerWidth < SCREEN_MD_BREAKPOINT ? 1 : 3);
            });
        });
    }
    initCarousel();
    window.addEventListener('load', (event) => {
        initCarousel();
    });

    document.addEventListener("DOMContentLoaded", function() {
        initCarousel();
    });
});    
