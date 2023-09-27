import { getauthemail , getemailVerified} from 'xps-utils/authtokendatahandler';

function collapseSection(element) {
  var sectionHeight = element.scrollHeight;
  element.style.height = sectionHeight + 'px';
  var elementTransition = element.style.transition;
  element.style.transition = '';
  element.addEventListener('transitionend', function() {
    element.removeEventListener('transitionend', arguments.callee);
    element.style.height = null;
  });  
  
  requestAnimationFrame(function() {
    element.style.height = sectionHeight + 'px';
    element.style.transition = elementTransition;
    requestAnimationFrame(function() {
      element.style.height =   0 + 'px';
    });
  });
}


function expandSection(element) {
  var sectionHeight = element.scrollHeight;
  element.style.height = sectionHeight + 'px';
  element.addEventListener('transitionend', function() {
    element.removeEventListener('transitionend', arguments.callee);
    element.style.height = null;
  });
}

const toggleClass = (elem, klass, expanding = false) => {
  if (elem.classList.contains(klass)) {
    if (expanding) {
      collapseSection(elem);
    }
    elem.classList.remove(klass);
  } else {
    if (expanding) {
      expandSection(elem);
    }
      elem.classList.add(klass);
  }
};

/**
 * Button functory method
 * 
 * @param {*} name - button name
 * @param {*} title  - title for the button
 * @param {*} parent - where to attach the button
 * @param {*} fn - on click function
 */
const navButtonFactory = (name, title, parent, fn) => {
  const className = `cmp-navigation__${name}`;
  const buttonDiv = document.createElement('div');
  buttonDiv.classList.add(className);
  buttonDiv.id = className;
  buttonDiv.innerHTML = `<button type="button" class="${className}-button">${title}</button>`;
  parent.after(buttonDiv);
  if (fn) {
    buttonDiv.querySelector("button").addEventListener('click', fn);
  }
  return buttonDiv;
};

const init = () => {
  // find first nav within header
  const navElem = document.querySelector('header nav.cmp-navigation');
  if (navElem) {
    //Uncomment this line to use the page title as selected tab label.
    //const activeNav = navElem.querySelector('.cmp-navigation__item--active > a');
    //const pageTitle = activeNav ? activeNav.text : 'Menu';
    const pageTitle = 'Menu';
    // class to append when toggling mobile menu
    const activeClass = 'cmp-navigation--mobile-menu-active';

    // construct mobile menu toggle btn
    const toggle = navButtonFactory('toggle', pageTitle, navElem, () => {
      [navElem].forEach(elem => toggleClass(elem, activeClass, true));
    });

    // construct account button 
    const accountContainer = document.querySelector('header .navigation-account-container');
    const account = navButtonFactory('account', '', navElem.parentElement, () => {
      const popupclass  = document.querySelector('.container.responsivegrid.navigation-logged-in--account-container');
      
      if(localStorage.getItem('userWelcomed')==='true'){
        const isUserEmailVerified = getemailVerified();
        if(isUserEmailVerified==='false' || !isUserEmailVerified){
            $('.cmp-container-my-beanz__contents .cmp-container-my-beanz__content--ul').get(0).classList.add("hidden");
            $('.cmp-container-my-beanz__contents .cmp-container-my-beanz__content--ul').get(1).classList.add("hidden");
        }
        else{
          $('.cmp-container-my-beanz__contents .cmp-container-my-beanz__content--ul').get(0).classList.remove("hidden");
          $('.cmp-container-my-beanz__contents .cmp-container-my-beanz__content--ul').get(1).classList.remove("hidden");
        }
        $('.cmp-navigation__account').addClass('navigation-account-logged-in--account-menu-active');
        if(popupclass.classList.contains('navigation-logged-in--account-container--popup-active')){
          $('.container.responsivegrid.navigation-logged-in--account-container').removeClass('navigation-logged-in--account-container--popup-active');
          $('.cmp-navigation__account').removeClass('navigation-account-logged-in--popup-active');
        }
        else{
          const user_email = getauthemail();
          $('.cmp-text-my-beanz__email').html(user_email);
          $('.container.responsivegrid.navigation-logged-in--account-container').addClass('navigation-logged-in--account-container--popup-active');
          $('.cmp-navigation__account').addClass('navigation-account-logged-in--popup-active');
        }

        const closeLoggedinElem = document.querySelector(".navigation-logged-in--account-container .close-logged-in-popup");
        if (closeLoggedinElem) {
          closeLoggedinElem.addEventListener('click', () => {
            popupclass.classList.remove('navigation-logged-in--account-container--popup-active');
            navAccountElem.classList.remove('navigation-account-logged-in--popup-active');
            document.body.classList.remove('overflow-hidden');
          });
        }

        $(document).click(function(event) {
          if (!$(event.target).closest(".cmp-navigation__account,.beanzLoggedIn").length) {
            popupclass.classList.remove('navigation-logged-in--account-container--popup-active');
            navAccountElem.classList.remove('navigation-account-logged-in--popup-active');
            document.body.classList.remove('overflow-hidden');
          }
        });
        
        }
      else{
      $('.cmp-navigation__account').removeClass('navigation-account-logged-in--account-menu-active');
      toggleClass(accountContainer, 'navigation-account-container--account-menu-active', true);
      toggleClass(account, 'navigation-account-container--account-menu-active');
    }
    });

    const navAccountElem = document.getElementById("cmp-navigation__account");

    // if both elements exist on the page
    if (navAccountElem && accountContainer) {
      navAccountElem.appendChild(accountContainer);
    }

    // close account popup event listener
    const closeAccountElem = document.querySelector(".navigation-account-container .button:last-child");
    if (closeAccountElem) {
      closeAccountElem.addEventListener('click', () => {
        accountContainer.classList.remove('navigation-account-container--account-menu-active');
        account.classList.remove('navigation-account-container--account-menu-active');
      });
    }

    $(document).click(function(event) {
      if (!$(event.target).closest(".cmp-navigation__account,.navigation-account-container .cmp-container").length) {
        accountContainer.classList.remove('navigation-account-container--account-menu-active');
        account.classList.remove('navigation-account-container--account-menu-active');
        
      }
    });

    // construct search button 
    const searchContainer = document.querySelector('.beanzSearch');
    const search = navButtonFactory('search', 'Search', navElem.parentElement, () => {
      toggleClass(search, 'active');
      toggleClass(searchContainer, 'active');
      document.body.classList.toggle('overflow-hidden');
    });
    search.addEventListener('click',() => {
      const searchInput = document.querySelector('#beanz-search-input');
      searchInput.focus();
    })
  }
};
/**
 * when page is ready
 */
document.addEventListener('DOMContentLoaded', init);
