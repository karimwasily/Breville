/*
 * cmp-sticky-section.js
 *
 */

'use strict';

function isMobileMode() {
  return ($(window).outerWidth() <= 768);
}

(function() {
  const FLOAT_CLASS = "cmp-sticky-section__content--float";

// Margin needed for the box-shadow
  const MARGIN = 12;
  window.OnDemand = window.OnDemand || {};
 
  window.OnDemand.StickySection = {
    klass: ".cmp-sticky-section",

    // eslint-disable-next-line
    attach: function(context, options) {
      if (context.classList.contains(this.klass)) {
        OnDemand.StickySection.initialize(context);
      } else {
        context.querySelectorAll(this.klass).forEach((component) => {
          OnDemand.StickySection.initialize(component);
        });
      }
    },

    show: function() {
      this.content.classList.add(FLOAT_CLASS);
    },

    hide: function() {
      this.content.classList.remove(FLOAT_CLASS);
    },

    showHide: function() {
      if (this.headerShowing === true) {
        if (this.footerShowing === true) {
          this.hide();
        } else {
          this.show();
        }
      } else {
        this.hide();
      }
    },

    handleIntersectionTop: function(entries) {
      const [entry] = entries;
      if (entry.boundingClientRect.bottom < 0) {
        this.headerShowing = true;
      } else {
        this.headerShowing = false;
      }
      this.showHide();
    },

    handleIntersectionBottom: function(entries) {
      const [entry] = entries;
      if (entry.boundingClientRect.top < window.innerHeight) {
        this.footerShowing = true;
      } else {
        this.footerShowing = false;
      }
      this.showHide();
    },
	
	scrollTo: function (event) {
      if (event.target.href) {
		   
        const height = this.top.offsetHeight + MARGIN;
        const top =
          document
            .querySelector(new URL(event.target.href).hash)
            .getBoundingClientRect().top -
          document.body.getBoundingClientRect().top;
        window.scroll({
          top: (top - height) + 50,
          left: 0,
          behavior: "smooth",
        });
        if(isMobileMode()){
          window.scroll({
            top: (top - height),
            left: 0,
            behavior: "smooth",
          });
        };
        event.preventDefault();
      }
    },

    initialize: function(el) {
      this.headerShowing = false;
      this.footerShowing = false;
      this.top = el.querySelector(".cmp-sticky-section__top");
      this.content = el.querySelector(".cmp-sticky-section__content");
      this.footer = document.querySelector('.cmp-experiencefragment--footer');
      this.hide();
      this.observerTop = new window.IntersectionObserver(this.handleIntersectionTop.bind(this));
      this.observerBottom = new window.IntersectionObserver(this.handleIntersectionBottom.bind(this));
      this.observerTop.observe(this.top);
      this.observerBottom.observe(this.footer);
	  
	  el.querySelectorAll('a[href*="#"]').forEach((anchor) => {
        if (anchor.href != "#" || anchor.href != "#0") {
          anchor.addEventListener("click", this.scrollTo.bind(this));
        }
      });
    },

    detach: function() {
      this.observerTop.unobserve(this.top);
      this.observerBottom.unobserve(this.top);
	  }
  };
})();
