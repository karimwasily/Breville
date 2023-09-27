const QUERY = {
    ACTION: ".cmp-recipecarousel__action",
    ITEM: ".cmp-carousel__item",
    ITEM_PREVIOUS: ".cmp-recipecarousel__action--previous",
    ITEM_NEXT: ".cmp-recipecarousel__action--next"
};

const CLASS = {
    ITEM_ACTIVE: "cmp-carousel__item--active",
    ITEM_PREVIOUS: "cmp-recipecarousel__action--previous",
    ITEM_NEXT: "cmp-recipecarousel__action--next"
};

const buttons = document.querySelectorAll(QUERY.ACTION);

buttons.forEach(button => {
    button.addEventListener("click", function() {
        const recipeCarousel = this.parentElement.parentElement;
        const recipeElements = recipeCarousel.querySelectorAll(QUERY.ITEM);

        let position;

        recipeElements.forEach( (element, index) => {
            if(element.classList.contains(CLASS.ITEM_ACTIVE)) {
                position = index;
            }
        });

        if(button.classList.contains(CLASS.ITEM_PREVIOUS) && 0 === position - 1) {
            recipeCarousel.querySelector(QUERY.ITEM_PREVIOUS).style.visibility='hidden';
            recipeCarousel.querySelector(QUERY.ITEM_NEXT).style.visibility='visible';
        }
        else if(button.classList.contains(CLASS.ITEM_NEXT) && recipeElements.length - 1 === position + 1) {
            recipeCarousel.querySelector(QUERY.ITEM_NEXT).style.visibility='hidden';
            recipeCarousel.querySelector(QUERY.ITEM_PREVIOUS).style.visibility='visible';
        }
        else {
            recipeCarousel.querySelector(QUERY.ITEM_NEXT).style.visibility='visible';
            recipeCarousel.querySelector(QUERY.ITEM_PREVIOUS).style.visibility='visible';
        }
    });
});
