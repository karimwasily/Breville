// /* JS Snippet to trigger image replacement for Content Fragment */
// var jQuery = require("jquery");

// jQuery(function (element,$) {
//     "use strict";

//     $('.cmp-teaser--hero .cmp-teaser .cmp-teaser__image').each(function(){
//         $(this).hide();
//         const src = $(this).find("image").src();
//         $(this).parent().parent().css("background-image", "url(" + src + ")");
//      });


// }('body',jQuery));


// Example of how a component should be initialized via JavaScript
// This script logs the value of the component's text property model message to the console

(function() {
    "use strict";

    // Best practice:
    // For a good separation of concerns, don't rely on the DOM structure or CSS selectors,
    // but use dedicated data attributes to identify all elements that the script needs to
    // interact with.
    var selectors = {
        self:      '.cmp-teaser--hero .cmp-teaser .cmp-teaser__image .cmp-image',
        image:     '[data-cmp-is="image"]'
    };

    function HeroTeaser(config) {

        function init(config) {
            // Best practice:
            // To prevents multiple initialization, remove the main data attribute that
            // identified the component.
            //config.element.removeAttribute("data-cmp-is");

            var image = config.element;
            image.style.display = "none";
            var parent = config.element.parentNode.parentNode.parentNode;
            // Get img src from dataset if div has any children('img' tag)
            image = image.childNodes.length >= 1 ? image.dataset.asset : null;
            parent.style.backgroundImage = "url('" + image + "')";
        }

        if (config && config.element) {
            init(config);
        }
    }

    // Best practice:
    // Use a method like this mutation obeserver to also properly initialize the component
    // when an author drops it onto the page or modified it with the dialog.
    function onDocumentReady() {
        var elements = document.querySelectorAll(selectors.self);
        for (var i = 0; i < elements.length; i++) {
            new HeroTeaser({ element: elements[i] });
        }

        var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
        var body             = document.querySelector("body");
        var observer         = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                // needed for IE
                var nodesArray = [].slice.call(mutation.addedNodes);
                if (nodesArray.length > 0) {
                    nodesArray.forEach(function(addedNode) {
                        if (addedNode.querySelectorAll) {
                            var elementsArray = [].slice.call(addedNode.querySelectorAll(selectors.self));
                            elementsArray.forEach(function(element) {
                                new HeroTeaser({ element: element });
                            });
                        }
                    });
                }
            });
        });

        observer.observe(body, {
            subtree: true,
            childList: true,
            characterData: true
        });
    }

    if (document.readyState !== "loading") {
        onDocumentReady();
    } else {
        document.addEventListener("DOMContentLoaded", onDocumentReady);
    }

}());
