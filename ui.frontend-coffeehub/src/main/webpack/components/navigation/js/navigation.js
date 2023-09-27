/**
 * helper to toggle add/remove class selector
 *
 * @param {Element} elem  - element to check
 * @param {String} klass - class selector to add and remove
 */
const QUERY = {
  NAV_ELEMENT: ".cmp-navigation__group",
  LINKS: ".cmp-navigation__item-link",
};

const BREAKPOINT_MD = 769;

const toggleClass = (elem, klass) => {
  if (elem.classList.contains(klass)) {
    elem.classList.remove(klass);
  } else {
    elem.classList.add(klass);
  }
};


// Needed this function for the tab accessibility of the issues
function tabAccessibility(accessibility, check) {
  const navelement = document.querySelector(QUERY.NAV_ELEMENT);
  if (navelement) {
    const links = navelement.querySelectorAll(QUERY.LINKS);
    let index = 0;
    links.forEach(element => {
      if (!index && accessibility === "0" && window.innerWidth < BREAKPOINT_MD && !check) {
        element.focus();
      }
      element.tabIndex = accessibility;
      index = index + 1;
    });
  }
}

/**
 * handle mobile nav toggle
 */
const initMobileNavToggle = () => {
  // find first nav within header
  const navElem = document.querySelector('header nav.cmp-navigation');
  // class to append when toggling mobile menu
  const activeClass = 'cmp-navigation--mobile-menu-active';

  const bodyElem = document.body;
  // class to append for body overflow hidden when toggling mobile menu
  const overflowClass = 'modal-overflow-hidden';

  // construct mobile menu toggle btn
  const toggle = document.createElement('div');
  toggle.classList.add('cmp-navigation__toggle');
  // provide id although not using to signify it is acting as a js hook
  toggle.id = 'cmp-navigation__toggle';
  toggle.tabIndex = "0";
  toggle.ariaLabel = "Open hidden mobile navigation";
  toggle.setAttribute("role", "button");
  toggle.innerHTML = '<span class="cmp-navigation__toggle-inner"></span>';

  // add toggle btn to dom
  navElem.after(toggle);

  let clickIndex = 0;
  // listen for click & toggle
  toggle.addEventListener('click', () => {
    ;[navElem, toggle].forEach(elem => toggleClass(elem, activeClass));
    [bodyElem].forEach(elem => toggleClass(elem, overflowClass));

    if (clickIndex % 2 == 0) {
      tabAccessibility("0", true);
      toggle.focus();
    }
    else {
      tabAccessibility("-1", false);
      toggle.focus();
    }
    clickIndex = clickIndex + 1;

  });
  let checkFocus = 0;
  let tabFocus = 0;
  
  document.addEventListener('keyup', function (e) {
    const navelement = document.querySelector(QUERY.NAV_ELEMENT);
    if (e.key === 'Tab' && document.querySelector(".cmp-navigation--mobile-menu-active")) {
      toggle.ariaLabel = "Close open mobile navigation";
      let navInFocus = 1;
      if(document.activeElement === navelement["firstElementChild"]["firstElementChild"])
        {
          tabFocus = 1;  
        }
        else {
          tabFocus = 0;
        }    
      if (navelement) {
        const links = navelement.querySelectorAll(QUERY.LINKS);
        links.forEach(element => {
          if (document.activeElement === element || document.activeElement === toggle) {
            navInFocus = 0;
          }
        });
        if (navInFocus) {
          tabAccessibility("0", false);
        }
      }
    } else {
      toggle.ariaLabel = "Open hidden mobile navigation";
    }
    if (e.shiftKey && document.querySelector(".cmp-navigation--mobile-menu-active")) {
      if (navelement) {
        if (navelement["firstElementChild"]) {
          if (navelement["firstElementChild"]["firstElementChild"]) {
            if(document.activeElement === navelement["firstElementChild"]["firstElementChild"]){
              if(checkFocus % 2 != 0 ){
                toggle.focus();
              }
              checkFocus = checkFocus + 1;              
            }

          }
        }
      }


    }
  });
  let index = 0;
  toggle.addEventListener('keyup', function (e) {
    if (e.key === 'Enter') {
      toggle.click();
      if (index % 2 == 0) {
        tabAccessibility("0", false);
      }
      else {
        tabAccessibility("-1", false);
      }
      index = index + 1;
    }
  });
};

/**
 * initialisation
 */
const init = () => {
  window.addEventListener("resize", init);
  initMobileNavToggle();
  if (window.innerWidth < BREAKPOINT_MD) {
    tabAccessibility("-1", false);
  } else {
    tabAccessibility("0", false);
  }
};

/**
 * when page is ready
 */
document.addEventListener('DOMContentLoaded', init);
