const QUERY = {
  LIST_ITEM: ".cmp-secondary-navigation__group__item",
  ACTIVE_ITEM: ".cmp-secondary-navigation__group__item-active",
  TEXT: ".cmp-teaser__content",
  LIST: ".cmp-secondary-navigation__group",
  TITLE: ".cmp-teaser__pretitle",
  LINK: 'a[href*="#"]',
  SELCTED_ITEM: ".cmp-secondary-navigation__group__item-selected",
  NAVIGATION: ".cmp-secondary-navigation",
};

const activeItemClass = "cmp-secondary-navigation__group__item-active";
const selectedItemClass = "cmp-secondary-navigation__group__item-selected";
const BREAKPOINT_MD = 768;

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


function activeItemOnScroll() {
  const textElements = document.querySelectorAll(QUERY.TEXT);
  const anchors = document.querySelectorAll(QUERY.LIST);
  if (anchors[1]) {
    const links = anchors[1].querySelectorAll(QUERY.LINK);
    if (textElements) {
      textElements.forEach(textElement => {
        const elementInViewPort = isInViewport(textElement);
        if (elementInViewPort && links.length > 0) {
          links.forEach(anchor => {
            if (textElement.querySelector(QUERY.TITLE)) {
              if (textElement.querySelector(QUERY.TITLE).innerHTML.toLowerCase() == anchor.getAttribute('href').substr(1)) {
                (document.querySelector(QUERY.ACTIVE_ITEM)) ? document.querySelector(QUERY.ACTIVE_ITEM).classList.remove(activeItemClass) : '';
                anchor.classList.add(activeItemClass);
                let scrollLeftValue = 0;
                if (isInViewport(anchor) === false) {
                  const xPosition = anchor.getBoundingClientRect().x;
                  const style = anchor.parentNode.currentStyle || window.getComputedStyle(anchor.parentNode);
                  const marginLeft = parseInt(style.marginLeft);
                  scrollLeftValue = ((xPosition > 0) ? marginLeft : (marginLeft * -1));
                  const parentElement = anchor.parentNode.parentNode;
                  anchor.scrollIntoView(false);
                  parentElement.scrollLeft += scrollLeftValue;
                }
              }
            }
          });
        }
      })
    }
  }
}

function activeItem() {
  const anchors = document.querySelectorAll(QUERY.LIST);
  if (anchors[1]) {
    const links = anchors[1].querySelectorAll(QUERY.LINK);
    if (links.length > 0) {
      links.forEach(anchor => {
        (document.querySelector(QUERY.ACTIVE_ITEM)) ? document.querySelector(QUERY.ACTIVE_ITEM).classList.remove(activeItemClass) : '';
        this["firstElementChild"].classList.add(activeItemClass);
      });
    }
  }
  document.removeEventListener("scroll", activeItemOnScroll);
  setTimeout(() => {
    document.addEventListener("scroll", activeItemOnScroll);
  }, 1000);
}

function isScrollable(el) {

  /*The scrollLeft() method returns the horizontal 
  scrollbar position for the selected elements.*/
  var x1 = el.scrollLeft;
  el.scrollLeft += 1;
  var x2 = el.scrollLeft;
  el.scrollLeft -= 1;
  var x3 = el.scrollLeft;
  el.scrollLeft = x1;

  //returns true or false accordingly
  return {
    horizontallyScrollable: x1 !== x2 || x2 !== x3
  }
}

function adjustAlignmentOfItems() {
  const navigationBar = document.querySelectorAll(QUERY.NAVIGATION);
  if (navigationBar.length > 0) {
    const scrollBar = isScrollable(navigationBar[1])['horizontallyScrollable'];
    if (scrollBar) {
      navigationBar[1].querySelector(QUERY.LIST).style.justifyContent = "unset";
    }
    else if (window.innerWidth > BREAKPOINT_MD) {
      navigationBar[1].querySelector(QUERY.LIST).style.justifyContent = "center"
    }
    else {
      navigationBar[1].querySelector(QUERY.LIST).style.justifyContent = "unset";
    }
  }
}

function onDocumentReady() {
  var list = document.querySelectorAll(QUERY.LIST);
  list = list[1]; // Just needed the sticky navigation
  list.addEventListener('scroll', function (event) {
    var element = event.target;
    if (element.scrollWidth - element.scrollLeft === element.clientWidth && (window.innerWidth <= BREAKPOINT_MD)) {
      document.querySelector(QUERY.LIST) ? document.querySelector(QUERY.LIST).classList.remove("cmp-secondary-navigation__group") : '';
      list.classList.add(selectedItemClass);
    }
    else {
      document.querySelector(QUERY.SELCTED_ITEM) ? document.querySelector(QUERY.SELCTED_ITEM).classList.remove(selectedItemClass) : '';
      list.classList.add("cmp-secondary-navigation__group");
    }
  });
  const navItems = document.querySelectorAll(QUERY.LIST_ITEM);
  if (navItems) {
    window.addEventListener("resize", adjustAlignmentOfItems);
    navItems.forEach(element => {
      element.addEventListener("click", activeItem);
    });
  }
  document.addEventListener("scroll", activeItemOnScroll)

  // Needed for Zoom accessibility
  adjustAlignmentOfItems();

}

if (document.readyState !== "loading") {
  onDocumentReady();
} else {
  document.addEventListener("DOMContentLoaded", onDocumentReady);
}
