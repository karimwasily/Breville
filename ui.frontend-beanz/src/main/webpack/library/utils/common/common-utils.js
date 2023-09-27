/*!
 * common.utils.js

 * This file contians some most common utility functions
 *
 * @project:    Beanz Rewrite
 * @date:       2021-05-12
 * @author:     Mahesh
 * @licensor:   Breville
 * @namespaces: snro
 */
//this will cause the browser to check for errors more aggressively
/* eslint-disable new-cap */
/*eslint no-bitwise: ["error", { "allow": [">>>", "~"] }] */
/**
 * @namespace Main
 * @memberof snro
 * @property {null} property - description of property
 */

 //this will cause the browser to check for errors more aggressively
'use strict';

(function(window, $, snro, A11yDialog, affirm, mulberry) {
  snro = window.snro = snro || {};
  /**
   * Generic loader constructor to customize where to place the loader. Accepts any valid selector or jQuery object
   * @param {selector, HTMLElement, or jQuery object} loader
   */
  function _Loader(loader) {
    if (!(loader instanceof jQuery)) {
      loader = $(loader);
    }
    this.length = loader.length;
    if (!this.length) {
      return this;
    }
    this.htmlText = loader[0].outerHTML;
    this.loader = loader;
    this[0] = loader[0];
  }

  /**
   * Generic loader prototype methods
   */
  _Loader.prototype = {
    constructor: _Loader,
    target: function(domEle) {
      if (this.length) {
        $(domEle)
          .html(this.loader);
      }
      return this;
    },
    appendTo: function(domEle) {
      if (this.length) {
        $(domEle)
          .append(this.loader);
      }
      return this;
    },
    insertAfter: function(domEle) {
      if (this.length) {
        $(domEle)
          .after(this.loader);
      }
      return this;
    },
    insertBefore: function(domEle) {
      if (this.length) {
        $(domEle)
          .before(this.loader);
      }
      return this;
    },
    remove: function() {
      return this.loader.remove();
    }
  };

  window.globalCache = snro.globalCache = {
    regex: {
      mobile: /android|webos|iphone|blackberry|iemobile|opera mini/i,
      tablet: /ipad|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i,
      breakpoint: /:(?=([\s\d]+)px)/i
    },
    UA: navigator.userAgent.toLowerCase(),
    isKeyboardFocus: false
  };

  const _cache = {};
  snro.commonUtils = {
    moduleName: 'commonUtils', // Added for debug logs

    updateCache() {
      _cache.oProductGrid = $('.o-product-grid');
      _cache.compareResult = $('.c_product_compare');
      _cache.tableContainer = _cache.compareResult.find('.c_product_compare__table');
      _cache.relatedPannel = $('.js-related-product-panel');
      _cache.rangeFilterContainer = $('.js-filter-container');
      _cache.addToCart = $('.js-addToCartBtn');
      _cache.filterChipsContainer  = $('.js-fliter-chips-container');
      _cache.rangeSlider =null;
      _cache.lazyImages = [];
    },

    // check if mobile

    isMobile: function() {
      return (snro.globalCache.regex.mobile.test(snro.globalCache.UA));
    },
    // check if viewport is equal to mobile (resized desktop browser)
    isMobileMode: function() {
      return ($(window)
        .outerWidth() <= 768);
    },
    // check if tablet
    isTablet: function() {
      return (snro.globalCache.regex.tablet.test(snro.globalCache.UA));
    },
    // check if viewport is equal to tablet (resized desktop browser)
    isTabletMode: function() {
      return ($(window)
        .outerWidth() >= 768 && $(window)
        .outerWidth() <
        992);
    },
    // check if desktop
    isDesktop: function() {
      return (!this.isMobileOrTablet());
    },
    // check if desktop or tablet viewport width
    isTabletOrDesktopMode: function() {
      return (this.isTabletMode() || this.isDesktopMode());
    },
    // check if viewport width is qualified desktop
    isDesktopMode: function() {
      return ($(window)
        .outerWidth() >= 992);
    },
    // check if mobile or tablet
    isMobileOrTablet: function() {
      return (this.isMobile() || this.isTablet());
    },
    // check if iframe is resized
    resizeIframe: function(obj) {
      if (obj instanceof window.Node && obj.nodeType === 1) { // Is DOM element other than document
        obj.style.height = obj.contentWindow.document.body.scrollHeight +
          'px';
      }
    },
    // set local cookie
    setCookie: function(key, value, exp, path, domain) {
      if (!(typeof key === 'string' && key.length)) {
        return; // Key is mandatory
      }
      if (typeof value !== 'string') {
        value = '';
      } //If value is invalid by default empty string will be set
      const
        dt = new Date();
      if (typeof exp === 'number') {
        if (exp === Infinity) {
          dt = new Date('Thu, 31 Dec 2037 00:00:00 GMT');
        } else {
          dt.setTime(dt.getTime() + (exp * 24 * 60 * 60 * 1000));
        }
      }
      const
        expires = exp ? '; expires=' + dt.toUTCString() : '',
        cookiePath = '; path=' + ((typeof path === 'string') ? path.trim() :
          '/'),
        defaultDomain = window.location.hostname,
        cookieDomain = '';
      if (defaultDomain === 'localhost') { // IE does not allow localhost domain
        if (typeof domain === 'string') {
          cookieDomain = '; domain=' + domain.trim();
        }
      } else {
        cookieDomain = '; domain=' + ((typeof domain === 'string') ?
          domain.trim() : defaultDomain);
      }
      document.cookie = key + '=' + value + expires + cookieDomain +
        cookiePath;
    },
    // get cookie
    getCookie: function(key) {
      if (!(typeof key === 'string' && key.length)) {
        return '';
      }
      const cookieString = decodeURIComponent(document.cookie);
        const index = 0,
        allCookies = [],
        c = '';
      key += '=';
      if ((allCookies = cookieString.split(';'))
        .length) {
        for (; index < allCookies.length; index++) {
          if (~(c = allCookies[index].trim())
            .indexOf(key)) {
            return c.substring(key.length, c.length)
              .trim();
          }
        }
      }
      return '';
    },
    // remove cookie
    removeCookie: function(key, path, domain) {
      if (!(typeof key === 'string' && key.length)) {
        return false;
      }
      const
        cookiePath = (typeof path === 'string') ? path : '/',
        defaultDomain = window.location.hostname,
        cookieDomain = '',
        deletedCookieString = '';
      if (defaultDomain === 'localhost') { // IE does not allow localhost domain
        if (typeof domain === 'string') {
          cookieDomain = '; domain=' + domain.trim();
        }
      } else {
        cookieDomain = '; domain=' + ((typeof domain === 'string') ?
          domain.trim() : defaultDomain);
      }
      deletedCookieString = key +
        '=; expires=Thu, 01 Jan 1970 00:00:00 UTC' + cookieDomain +
        '; path=' + cookiePath;
      document.cookie = deletedCookieString;
      return !(this.getCookie(key)
        .length); // Ensure if cookie has been deconsted
    },
    // reset cookie
    resetCookie: function(key, value, exp, path, domain) {
      this.removeCookie(key, path, domain);
      this.setCookie(key, value, exp, path, domain);
    },
    // set in storage (session / local / cookie) based on fallback
    storage: {
      available: (typeof window.Storage === 'function'), // True only if webstorage is available
      // Method to store key values in any available storages
      set: function(key, value, isSession) {
        if (!(typeof key === 'string' && key.length)) {
          return;
        }
        isSession = (typeof isSession === 'boolean' ? isSession : false); // By default localStorage will be used
        const
          vl = (typeof value === 'object' && value !== null) ? JSON.stringify(
            value) : value;
        // Check if storage is defined
        if (this.available) {
          try {
            if (isSession) {
              window.sessionStorage.setItem(key, vl);
            } else {
              window.localStorage.setItem(key, vl);
            }
            return;
          } catch (e) {
            // catch error here
          }
        }
        // If control has reached here, it means storage operation was unsuccessful and we need to set a cookie instead
        if (isSession) {
          // Set a session cookie
          snro.commonUtils.setCookie(key, vl);
        } else {
          snro.commonUtils.setCookie(key, vl, Infinity);
        }
        return;
      },
      // Method to remove key from all available storages
      remove: function(key) {
        if (!(typeof key === 'string' && key.length)) {
          return false;
        }
        if (this.available) {
          try {
            window.localStorage.removeItem(key);
            window.sessionStorage.removeItem(key);
            return (!window.localStorage.key(key) || !window.sessionStorage
              .key(key) || snro.commonUtils.removeCookie(key));
          } catch (e) {
            //catch error here
          }
        }
        return snro.commonUtils.removeCookie(key);
      },
      // Get stored values from all available storages
      getAll: function(key, isSession) {
        const
          returnValue = [],
          cookieValue = null;
        isSession = (typeof isSession === 'boolean') ? isSession : false;
        if (this.available) {
          try {
            if (Object.prototype.hasOwnProperty.call(window.sessionStorage,
                key) && !isSession) {
              returnValue.push({
                value: window.sessionStorage.getItem(key),
                storage: 'sessionStorage'
              });
            }
            if (Object.prototype.hasOwnProperty.call(window.localStorage,
                key)) {
              returnValue.push({
                value: window.localStorage.getItem(key),
                storage: 'localStorage'
              });
            }
          } catch (e) {
            // catch error here
          }
        }
        if ((cookieValue === snro.commonUtils.getCookie(key))
          .length) {
          returnValue.push({
            value: cookieValue,
            storage: 'cookie'
          });
        }

        return returnValue.map(function(data) {
          try {
            data.value = JSON.parse(data.value);
            return data;
          } catch (e) {
            return data;
          }
        });
      },
      // Get stored value from first match
      get: function(key, isSession) {
        const
          storedValue = null;
        isSession = (typeof isSession === 'boolean') ? isSession : false;
        if (!isSession) {
          // Check session storage first. Session storage should always have priority over local storage
          storedValue = this.getFromSessionStorage(key);
          if (!storedValue) {
            storedValue = this.getFromLocalStorage(key);
          }
        } else {
          // If isSession is true, then session storage is forced. In means we cannot get value from local storage
          storedValue = this.getFromSessionStorage(key);
        }
        // If neither of the storages have value. It means value could be in cookies
        if (!storedValue && !(storedValue = this.getFromCookies(key))) {
          return; // Return undefined
        }
        // Return the value part if value object has been successfully received
        return storedValue.value;
      },
      // update the value in storage
      update: function(key, callbackOrValue, isSession) {
        const
          value = this.get(key);
        if (typeof callbackOrValue === 'function') {
          this.set(key, callbackOrValue(value, key), isSession);
        } else {
          this.set(key, callbackOrValue, isSession);
        }
      },
      // Get stored value from local storage only
      getFromLocalStorage: function(key) {
        return this.getAll(key, true)
          .filter(function(valueOb) {
            return valueOb.storage === 'localStorage';
          })[0];
      },
      // Get stored value from session storage only
      getFromSessionStorage: function(key) {
        return this.getAll(key)
          .filter(function(valueOb) {
            return valueOb.storage === 'sessionStorage';
          })[0];
      },
      // Get stored value from cookies only
      getFromCookies: function(key) {
        return this.getAll(key)
          .filter(function(valueOb) {
            return valueOb.storage === 'cookie';
          })[0];
      }
    },

    // check if user is logged in
    isLoggedIn: function() {
      return !!this.getCookie('loggedIn');
    },
    // add loader to any target
    loader: function(target, appendMode, overlay = false) {
      let loader;
      const loadercol = $('<div>')
        .addClass(
          'lds-spinner')
        .prepend(
          `<div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>`);
      if (!overlay) {
        loader = loadercol;
      } else {
        loader = $('<div>')
          .addClass('loader-backdrop')
          .wrapInner(
            loadercol);
      }
      if (target) {
        if (appendMode) {
          $(target)
            .append(loader);
        } else {
          $(target)
            .html(loader);
        }
      } else {
        return new _Loader(loader);
      }
    },
    // log to console if debug mode
    log: function() {
      try {
        // Enable logs if development environment is true or debugClientLibs param is provided
        if (snro.commonUtils.queryParams('debugClientLibs')) {
          console.log(arguments[0]); // eslint-disable-line
        }
      } catch (e) {
        // catch error here
      }
    },
    // get value of any url query parameter
    queryParams: function(name, url) {
      if (!url) {
        url = location.href;
      }
      name = name.replace(/[\[]/, '\\\[')
        .replace(/[\]]/, '\\\]');
      const
        regexS = '[\\?&]' + name + '=([^&#]*)',
        regex = new RegExp(regexS),
        results = regex.exec(url);
      return results === null ? null : results[1];
    },

    // initialize lazyloading of images
    lazyloadImages() {
      _cache.lazyImages = $('.lazyloading');
      if(_cache.lazyImages.length) {
        for(const i=0; i<_cache.lazyImages.length; i++) {
          if(this.isInViewport(_cache.lazyImages[i])){
            if(this.srcsetSupported()) {
              _cache.lazyImages[i].srcset = _cache.lazyImages[i].getAttribute('data-srcset');
              _cache.lazyImages[i].removeAttribute('data-srcset');
            } else {
              _cache.lazyImages[i].src = _cache.lazyImages[i].getAttribute('data-src');
              _cache.lazyImages[i].removeAttribute('data-src');
            }
            $(_cache.lazyImages[i]).removeClass('lazyloading').addClass('lazyloaded');
          }
        }
      }
    },

    srcsetSupported() {
      const img = document.createElement('img');
      return ('sizes' in img);
    },

    isInViewport(el){
      const rect = el.getBoundingClientRect();
      return (
          rect.bottom >= 0 &&
          rect.right >= 0 &&

          rect.top <= (
          window.innerHeight ||
          document.documentElement.clientHeight) &&

          rect.left <= (
          window.innerWidth ||
          document.documentElement.clientWidth)
      );
    },

    //add target="_blank" to anchor tag having external link
    modifyAnchorTag() {
      const anchorTag = $('a');
        let hrefStr = null;
      const BREVILLE_MICROSITE = 'breville-microsites',
        GIFTGUIDE = 'giftguide',
        BREVILLE_BASE = window.location.host,
        TARGET_BLANK = '_blank',
        TARGET_TAGS = 'noopener';
      anchorTag.each(function() {
        const $this = $(this);
        hrefStr = $this.attr('href');
        if (hrefStr) {
          hrefStr = hrefStr.toLowerCase();
          const firstChar = hrefStr.charAt(0);
          if (!(firstChar === '/' || firstChar === '#')) {
            if (hrefStr.indexOf(BREVILLE_BASE) === -1) {
              if (!$this.attr('target')) {
                $this.attr({
                  'target': TARGET_BLANK,
                  'rel': TARGET_TAGS
                });
              }
            }
          } else if (hrefStr.indexOf(BREVILLE_MICROSITE) !== -1 || hrefStr.indexOf(GIFTGUIDE) !== -1) {
            if (!$this.attr('target')) {
              $this.attr({
                'target': TARGET_BLANK,
                'rel': TARGET_TAGS
              });
            }
          }
        }
      });
    },

    //function to close loader modal window

    showSpinner(dialog_id) { // eslint-disable-line
      dialog_id = dialog_id || 'spinner__dialog'; // eslint-disable-line
      const spn = document.getElementById(dialog_id); // eslint-disable-line
      _cache.spinnerWindow = new A11yDialog(spn);
      _cache.spinnerWindow.show();
    },

    showPopUp(modalOptions, $ele) {
      const popupWindowTemplate = window.breville.templates['modal'],
        $elem = $ele ? $ele : $('.js-header'),
        dataConfig = $elem.data('error-config') ? $elem.data('error-config') : {},
        {
          modalID,
          className = 'popup',
          loaderTitle = dataConfig.errorPopupTitle,
          loaderText = dataConfig.errorPopupText,
          dialogContent = true,
          buttonLabel = dataConfig.errorCloseLabel ? dataConfig.errorCloseLabel : 'Close', //$jsHeader.data('error-popup-button'),
          linkLabel,
          linkUrl = dataConfig.primaryBtnUrl ? dataConfig.primaryBtnUrl : '#',
          svgIcon = 'Alert',
          btnType = 'primary',
          skuImage = ''
        } = modalOptions,
        $body = $('body'),
        popupWindowHTML = popupWindowTemplate({
          modalID,
          loaderTitle,
          className,
          loaderText,
          dialogContent,
          buttonLabel,
          linkLabel,
          linkUrl,
          svgIcon,
          btnType,
          skuImage
        });
      if (!$('#popUpWindow')
        .length) {
        $body.append('<div id=popUpWindow></div>');
      }
      $('#popUpWindow')
        .html(popupWindowHTML);
      $('#popUpWindow .cart-modal-button')
        .on('click', modalOptions.primaryButtonClickHandler);
      $('#popUpWindow .dialog__close')
        .on('click', modalOptions.cancelHandler);
      $('#popUpWindow .message-box-link')
        .on('click', modalOptions.seondarycButtonClickHandler);
      $('#popUpWindow .dialog__overlay')
        .on('click', modalOptions.overlayClickHandler);
      const popUpWindow = new A11yDialog(document.getElementById(modalOptions.modalID + '__dialog'));
      popUpWindow.on('hide', function() {
        $body.removeClass('hide-overflow-y');
      });
      popUpWindow.show();
      $body.addClass('hide-overflow-y');
      const popupwindow = $('#popUpWindow');
      const popupdialog = popupwindow.find('.dialog')
        .attr('id');
      if (popupdialog === '#new-form-notifyMe__dialog') {
        popupwindow.find('.cart-modal-button .btn')
          .addClass('btn--tertiary');
        popupwindow.find('.msg-box-icon')
          .hide();
      }
    },
    // This method is for showing Popup dialogs to handle different Error Codes
    handleErrorWithDialog(errorOptions) {
      const $elem = errorOptions ? (errorOptions.$elem ? errorOptions.$elem : $('.js-header')) : $('.js-header');
      this.showPopUp({
        modalID: 'errorPopUp',
        primaryButtonClickHandler: (event) => {
          event.preventDefault();
          if ($elem.hasClass('js-order-update')) {
            window.location.replace($elem.data('error-config')
              .primaryBtnUrl);
          }
        }
      }, $elem);
    },

    // Loader constructor
    Loader: _Loader,

    roundFloat: function round(value, precision) {
      var multiplier = Math.pow(10, precision || 0);
      return Math.round(value * multiplier) / multiplier;
    },

    getStarCount(rating) {
      rating = this.roundFloat(rating, 1);
      return {
        filled: Math.floor(rating),
        halfFilled: rating % 1 === 0 ? 0 : 1,
        get unfilled() { return 5 - this.filled - this.halfFilled; }
      };
    },

    getStarRatingHtml(rating) {
      const stars = this.getStarCount(rating);
      const ratingHtml = '';
      let idx;
      for (idx = 0; idx < stars.filled; idx++) {
        ratingHtml +=
          `<svg class="icon rating-icn icon-size-1rem" focusable="false" aria-hidden="true">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#Star_Filled" href="#Star_Filled"></use>
            </svg>`;
      }

      for (idx = 0; idx < stars.halfFilled; idx++) {
        ratingHtml +=
          `<svg class="icon rating-icn icon-size-1rem" focusable="false" aria-hidden="true">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#Star_HalfFilled" href="#Star_HalfFilled"></use>
          </svg>`;
      }

      for (idx = 0; idx < stars.unfilled; idx++) {
        ratingHtml +=
          `<svg class="icon rating-icn icon-size-1rem" focusable="false" aria-hidden="true">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#Star_UnFilled" href="#Star_UnFilled"></use>
          </svg>`;
      }

      return ratingHtml;
    },

    fetchProductRating(skuIds) {
      const since = 'all',
        awsAPIconfig = $('.js-header').data('aws-api-config'),
        defaultRatingsUrl = 'https://api.feefo.com/api/11/importedreviews/products/ratings',
        merchantIdentifier = awsAPIconfig ? (awsAPIconfig.merchantIdentifier ? awsAPIconfig.merchantIdentifier : 'breville-group') : 'breville-group',
        feefoRatingsUrl = awsAPIconfig ? (awsAPIconfig.feefoRatingsUrl ? awsAPIconfig.feefoRatingsUrl : defaultRatingsUrl) : defaultRatingsUrl;
      const self = this, // eslint-disable-line
        ratingUrl =
        `${feefoRatingsUrl}?merchant_identifier=${merchantIdentifier}&since_period=${since}&review_count=true&product_sku=`,
        options = {
          url: ratingUrl + skuIds,
          type: 'GET',
          cache: 'true'
        };
      snro.ajaxWrapper.getXhrObj(options)
        .done(function(data) {
          self.removeLoadingMsg();
          if (data.products) {
            self.displayProductRating(data.products);
          }
        })
        .fail(() => {
          self.removeLoadingMsg();
        });
    },

    displayProductRating(product) {

      for (var i = 0; i < product.length; i++) {
        const skuId = $('#rating-' + product[i].sku);
        if (product[i].review_count > 0 && product[i].rating > 0 && product[i].rating <= 5) {
          const rating = this.roundFloat(product[i].rating, 1);
          const roundedRating = Math.round(rating * 2) / 2;
          const ratingHtml = this.getStarRatingHtml(roundedRating);
          skuId.html(ratingHtml);
        } else {
          skuId.html($('.js-header')
            .data('no-review'));
        }
      }
    },

    removeLoadingMsg() {
      $('.js-product-rating')
        .find('.js-star-loading')
        .remove();
    },

    getProductCodesPlp() {
      const $jsProductRating = _cache.oProductGrid.find('.js-product-rating');
      const productsCode = [];
      if ($jsProductRating[0]) {
        $jsProductRating
          .each(function() {
            productsCode.push($(this)
              .data('sku-code'));
          });
        // this.fetchProductRating(productsCode.toString());
      }
    },

    validateRegex(val, regexp) {
      const regex = new RegExp(regexp);
      return regex.test(val);
    },

    initSlickSlider(tilesContainer, options, container) {
      const defaultOptions = {
        dots: true,
        infinite: false,
        accessibility: false,
        speed: 300,
        slidesToShow: 2,
        slidesToScroll: 2,
        mobileFirst: true,
        responsive: [
          {
            breakpoint: 766,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3
            }
          },
          {
            breakpoint: 1023,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 4
            }
          }]
      };

      options = $.extend({}, defaultOptions, options);

      if (tilesContainer[0]) { // check if there are tiles
        tilesContainer.slick(options);

        //hide dots if there is only one slides
        const slick = tilesContainer.slick('getSlick');
        if (slick.slideCount <= slick.options.slidesToShow && options.dots === true) {
          $(container)
            .addClass('single-slide');
        }
      }
    },

    initParsley(formID, options = {}) {
      const defaultOptions = {
        //class to be added on successful validation
        successClass: 'has-success',
        //class to be added in case of error
        errorClass: 'has-error',
        trigger: 'change',
        errorsContainer: function(parsleyField) {
          //specify the error container class
          var $err = parsleyField.$element.siblings('.error-message');
          return $err;
        },
        classHandler: function(parsleyField) {
          // specify where parsley error-success classes will be set
          return parsleyField.$element;
        },
      };
      const parsleyOptions = Object.assign(defaultOptions, options);

      return $(formID)
        .parsley(parsleyOptions);
    },

    //This method Initialize the range slider and update min and max value.
    initRangeSlider({ highestPrice, options = {} }) {
      const rangeSlider = _cache.rangeFilterContainer.find('#range_slider'),
        rangeFrom = _cache.rangeFilterContainer.find('.js-range-from'),
        rangeTo = _cache.rangeFilterContainer.find('.js-range-to'),
        maxRange = _cache.rangeFilterContainer.find('.js-max-range'),
        defaultOptions = {
          type: 'double',
          min: 0,
          max: highestPrice,
          min_interval: 100, // eslint-disable-line
          step: 10,
          onStart: function(data) {
            rangeTo.text(data.max);
            maxRange.text(data.max);
          }
        };

      options = $.extend({}, defaultOptions, options);

      _cache.rangeSlider = rangeSlider.ionRangeSlider(options);

      //tab navigation (fix accessibility issue)

      const bodyContainer = $('body');
      const rangeContainer  = bodyContainer.find('.js-range-slider-container');
      const minLabel = rangeContainer.data('min-label');
      const maxLabel = rangeContainer.data('max-label');
      const diff = 100;
      const currencyText = rangeContainer.find('.js-price-filter-currency').text();
      $('.c_price-range-filter .from, .c_price-range-filter .to').attr('tabindex', 0);
      rangeContainer.find('.from').attr({'role': 'button', 'aria-valuemin': 0, 'aria-valuenow': 0, 'aria-valuemax': highestPrice - diff, 'aria-label': minLabel, 'aria-valuetext': currencyText+0 });
      rangeContainer.find('.to').attr({'role': 'button', 'aria-valuemin': 0 + diff, 'aria-valuenow': highestPrice, 'aria-valuemax': highestPrice, 'aria-label': maxLabel, 'aria-valuetext': currencyText+highestPrice });
      rangeContainer.find('.irs-line').attr('tabindex', -1);

      function fromSliderTrigger() {
        $('.c_price-range-filter .from, .c_price-range-filter .to').attr('tabindex', 0);
        $('.c_price-range-filter .from').trigger('focus');
        rangeContainer.find('.irs-line').attr('tabindex', -1);
      }
      
      bodyContainer.on('keydown', '.c_price-range-filter .from', function(e) {
        const min = parseInt(rangeFrom.text());
        const max = parseInt(rangeTo.text());
        if(e.keyCode === 39 && (max - min) > diff) {
          snro.commonUtils.updateSlider({ from: min + 10 });
          setTimeout(() => {
            fromSliderTrigger();
          }, 0);  
        } else if (e.keyCode === 37) {
          snro.commonUtils.updateSlider({ from: min - 10 });
          setTimeout(() => {
            fromSliderTrigger();
          }, 0);
        }
      });

      function toSliderTrigger() {
        $('.c_price-range-filter .from, .c_price-range-filter .to').attr('tabindex', 0);
        $('.c_price-range-filter .to').trigger('focus');
        rangeContainer.find('.irs-line').attr('tabindex', -1);
      }
      
      
      bodyContainer.on('keydown', '.c_price-range-filter .to', function(e) {
        const min = parseInt(rangeFrom.text());
        const max = parseInt(rangeTo.text());
        if(e.keyCode === 39) {
          snro.commonUtils.updateSlider({ to: max + 10 });
          setTimeout(() => {
            toSliderTrigger();
          }, 0);
            
        } else if (e.keyCode === 37 && (max - min) > diff) {
          snro.commonUtils.updateSlider({ to: max - 10 });
          setTimeout(() => {
            toSliderTrigger();
          }, 0);
        }
      });

      //tab navigation (fix accessibility issue) ends

      rangeSlider.on('change', function() {
        const $this = $(this),
          value = $this.prop('value')
          .split(';'),
          bodyContainer = $('body');
        const [minValue, maxValue] = value; 
        rangeFrom.text(minValue);
        rangeTo.text(maxValue);
        bodyContainer.find('.from').attr({'role': 'slider', 'aria-valuemin': 0, 'aria-valuenow': minValue, 'aria-valuemax': maxValue - diff, 'aria-label': minLabel, 'aria-valuetext': currencyText+minValue});
        bodyContainer.find('.to').attr({'role': 'slider', 'aria-valuemin': minValue + diff, 'aria-valuenow': maxValue, 'aria-valuemax': 2500, 'aria-label': maxLabel, 'aria-valuetext': currencyText+maxValue});
      });
    },

    resetSlider(){
      _cache.rangeSlider.data('ionRangeSlider').reset();
    },

    updateSlider(data){
      _cache.rangeSlider.data('ionRangeSlider').update({
        from : data.from,
        to  :  data.to
      });
    },

    validateProductSkuCode() {
      if (_cache.addToCart.length) {
        $(_cache.addToCart)
          .each(function() {
            let encodedSku;
            const $this = $(this);
            if ($this.hasClass('compare-add-btn')) {
              encodedSku = $this.attr('data-encodedsku');
            } else {
              encodedSku = $this.parents('.js-product-detail-container')
                .find(':radio')
                .filter(':checked')
                .next()
                .data('encodedsku');
            }
            if (encodedSku === undefined) {
              $this.addClass('hidden')
                .siblings('.skucode-error-msg')
                .removeClass('hidden');
            }
          });
      }
    },

    //This is generic method to open window url, either in same or different tab
    winOpen(url, name, specs) {
      //default name = "_parent"
      window.open(url, name || '_parent', specs || '');
    },

    recipeProduct({ list, name, container, selectedArray = [] }) {
      const recipeProductTemplate = window.breville.templates['recipe-product'],
        recipes = [];

      //removing duplicate values from the list
      for (const idx = 0; idx < list.length; idx++) {
        if (recipes.indexOf(list[idx]) === -1) {
          recipes.push(list[idx]);
        }
      }

      for (const idx = 0; idx < recipes.length; idx++) {
        recipes[idx] = {
          recipeName: recipes[idx],
          name,
          isChecked: selectedArray.map((item) => item.trim()).indexOf(recipes[idx].trim()) === -1 ? false : true
        };
      }

      recipes.sort(function(recipeOne, recipeTwo){
        if(recipeOne.recipeName && recipeTwo.recipeName){
          const recipeOneName= recipeOne.recipeName.toUpperCase();
          const recipeTwoName= recipeTwo.recipeName.toUpperCase();
          if( recipeOneName < recipeTwoName){
            return -1;
          }
          else if(recipeOneName > recipeTwoName){
            return 1;
          }
          else{
            return 0;
          }
        }
        else{
          return 0;
        }
      });

      const recipeProductHtml = recipeProductTemplate(recipes);
      $(container)
        .html(recipeProductHtml);
      $(container)
        .find('.selected-product-recipe')
        .each(function() {
          $(this)
            .closest('.js-recipe-product-name')
            .addClass('selected-product-recipe');
        });
    },

    renderFilterChips(data){
      if(data && ((data.filterList && data.filterList.length) || data.priceRange)){
        _cache.filterChipsContainer.removeClass('hidden');
        if(_cache.filterChipsContainer.length){
          _cache.filterChipsContainer.html(window['breville']['templates']['filterChips'](data));
        }
      }
    },

    //This is generic method to return values based on keys that are teated as constant
    constVal: {
      IMAGE: 'image',
      LINK: 'link',
      BUTTON: 'button',
      SELECT: 'select',
      TILE: 'tile',
      VIDEO: 'video',
      GEN_CLICK_RULE: 'generalClickRule',
      ECOMM_CLICK_RULE: 'ecommClickRule',
      STORE_LOC_RESULTS_RULE: 'storeLocResultsRule',
      HEADER: 'Header',
      FOOTER: 'Footer',
      LANG: 'Language',
      GENERIC_CONTAINER: 'Generic Container',
      FEATURE_TILE: 'Feature Tile',
      HERO_BANNER: 'Hero Banner',
      PROMO_BANNER: 'Promo Banner',
      STORE_LOC: 'storeLocator',
      PDP: 'pdp',
      SUPPORT: 'support',
      LETS_CHAT: 'letschat',
      COMPARE: 'compare',
      ADD_TO_CART_CMP: 'addToCartCompare',
      PRODUCT: 'product',
      CART: 'cart',
      CHECKOUT: 'checkout',
      REMOVELINK: 'removelink',
      NOTIFY_ME_CMP: 'notifyMeCompare',
      EMAIL_SUBMIT: 'emailSubmit',
      PAYMENT_BTN: 'paymentBtn',
      SHIP_ADD_SUBMIT: 'shipAddSubmit',
      FORM_SUBMIT_RULE: 'formSubmitRule',
      FORM_LOAD_RULE: 'formLoadRule',
      RADIO: 'radio',
      ADD_TO_CART: 'addToCart',
      NOTIFY_ME: 'notifyMe',
      COLOR_CHANGE: 'colorChange',
      CAROUSEL: 'carousel',
      TESTIMONIAL: 'testimonial',
      TESTIMONIAL_SLIDE: 'testimonialslide',
      AFFIRM_MIN_VAL: 25000,
      KLARNA_VAL: 6000,
      LOGIN_BTN: 'Login Button',
      LOGOUT_BTN: 'Logout Button',
      CREATE_ACCOUNT_BTN: 'Create Account Button'
    },
    find() {
      if (!Array.prototype.find) {
        Object.defineProperty(Array.prototype, 'find', {
          value: function(predicate) {
            if (this === null) {
              throw new TypeError('"this" is null or not defined');
            }
            var o = Object(this);
            var len = o.length >>> 0;
            if (typeof predicate !== 'function') {
              throw new TypeError('predicate must be a function');
            }
            var thisArg = arguments[1]; // eslint-disable-line
            var k = 0;
            while (k < len) {
              var kValue = o[k];
              if (predicate.call(thisArg, kValue, k, o)) {
                return kValue;
              }
              k++;
            }
            return undefined;
          },
          configurable: true,
          writable: true
        });
      }
    },

    cleanParamWithIgnoreWords(q) {
      //This is a temporary fix for "search functionality", discused with Vineet, which will go at backend
      //CASE : Removing "the " key length(4) from the start of query
      const index = q.toLowerCase()
        .indexOf('the+');
      return (index === 0) ? q.slice(4) : q;
    },

    //below is hack for fixing & character in search query string as asked by Atish Jain
    removeAmpersand(q){
      return q.indexOf('%26') === -1 ? q :  q.split('%26').join(' ');
    },

    //below is encode symbol "™" and "®"
    encodeSymbol(q){
      if (q.indexOf('™') >= 0){
        return q.replace('™','&trade;');
      }else if (q.indexOf('®') >= 0){
        return q.replace('®','&reg;');
      }else{
        return q;
      }
    },


    renderFilters(filterObject) {
      const {
        products,
        moduleName,
        selectedFilters
      } = filterObject;
      const $moduleContext = $(`[data-module=${moduleName}]`);
      const $recipeFilter = $moduleContext.find('.js-recipe-filter');
      const $productFilter = $moduleContext.find('.js-product-filter');
      const recipeFilterContainer = '.js-recipe-filter-container',
        productFilterContainer = '.js-product-filter-container';
      const recipeList = [],
        productList = [];
      products.forEach((product) => {
        if (product.recipeFilter) {
          recipeList = recipeList.concat(product.recipeFilter);
        }
        if (product.productAttributeFilter) {

          productList = productList.concat(product.productAttributeFilter);
        }
      });

      if (recipeList.length) {
        this.recipeProduct({ list: recipeList, name: 'recipe', container: recipeFilterContainer, selectedArray: selectedFilters
            .recipeFilter });
        $recipeFilter.show();
      } else {
        $moduleContext.find(recipeFilterContainer)
          .html('');
        $recipeFilter.hide();
      }

      if (productList.length) {
        this.recipeProduct({ list: productList, name: 'product', container: productFilterContainer, selectedArray: selectedFilters
            .productAttributeFilter });
        $productFilter.show();
      } else {
        $moduleContext.find(productFilterContainer)
          .html('');
        $productFilter.hide();
      }
    },

    getRecipeFilter(recipeFilter, productFilter) {
      const filter = '',
        $jsRecipeFilter = $(recipeFilter),
        $jsProductFilter = $(productFilter);
      const filterDetails = {
        filter: '',
        recipeFilter: [],
        productAttributeFilter: []
      };

      function addFilter(selector, type) {
        const filterArray = filterDetails[type];
        selector.find('input:checked')
          .each(function() {
            const $this = $(this);
            filterArray.push(`${$this.data('label-name')}`);
          });
        filterArray = filterArray.map(function(val) {
          return encodeURIComponent(val);
        });
        if (filterArray.length) {
          const filterString = '"' + filterArray.join('" OR "') + '"';
          filter += ` AND ${type}:(${filterString})`;
        }
      }

      addFilter($jsRecipeFilter, 'recipeFilter');
      addFilter($jsProductFilter, 'productAttributeFilter');

      filterDetails.filter = filter;
      return filterDetails;
    },

    addClass(selectorArray, className) {
      for (const idx = 0; idx < selectorArray.length; idx++) {
        selectorArray[idx].addClass(className);
      }
    },

    removeClass(selectorArray, className) {
      for (const idx = 0; idx < selectorArray.length; idx++) {
        selectorArray[idx].removeClass(className);
      }
    },

    updateAffirmPromos(newPrice, compRoot) {
      //Update the wrapper elements' attributes in the DOM
      (compRoot) ?  compRoot.find('.affirmTag').attr('data-amount',newPrice) : $('.affirmTag').attr('data-amount', newPrice);
      //Call affirm.ui.refresh to re-render the promotional messaging componenets
      affirm.ui.refresh();
    },

    extractHostname(url) {
      let hostname;
      //find & remove protocol (http, ftp, etc.) and get hostname
      url.indexOf('//') > -1 ? [,,hostname] = url.split('/') : [hostname] = url.split('/');
      //find & remove port number
      [hostname] = hostname.split(':');
      //find & remove "?"
      [hostname] = hostname.split('?');
      return hostname;
    },

    checkEuropeanCountry() {
      const _completeUrl = window.location.href;
      if (_completeUrl.includes('/eu/') && _completeUrl.includes('sageappliances')) {
        return true;
      } else {
        return false;
      }
    },

    initializeMulberryHelp() {
      const mulberryCartToken = document.querySelector('.js-mulberry-global');
      const mulberryCartTokenAttribute = mulberryCartToken.getAttribute('data-mulberry-global');
      const mulberryProgramId = mulberryCartToken.getAttribute('data-mulberry-programid');
      return window.mulberry.core.init({
        publicToken: mulberryCartTokenAttribute
      }).then(function () {
        const coverage = mulberry.core.getCoverageDetails(mulberryProgramId);
        return coverage;
      }).then(function (coverage) {
        return mulberry.faq.init({
          useOverlay: true,
          coverage
        });
      }).then(function () {
        return mulberry.faq.open();
      });
    },

    helpCLick() {
      $(document).on('click', 'img.mulberryHelp', function (e) {
        e.stopPropagation();
        snro.commonUtils.initializeMulberryHelp();
        return false;
      });
    },

    // Toast notification start here
    toastNotify(toasterMsg) {
      const toastHtml = '<div class="toastWrapNotificationMsg arial"><div class="row align-items-xs-center"><div class="col-xs-10 no-gutters fontsize-16">' + toasterMsg + '</div><div class="col-xs-2 fontsize-16 text-right"><a href="#" class="toastOkNotificationMsg">OK</a></div></div></div>';
      $('body').append(toastHtml);
      setTimeout(function () {
        $('.toastWrapNotificationMsg').remove();
      }, 5000);
      $('.toastOkNotificationMsg').on('click', function () {
        $('.toastWrapNotificationMsg').remove();
      });
    },

    highlightTabOnLoad() {
      const hash = window.location.hash;
      hash && $('#myTab a[href="' + hash+ '"]').tab('show');
    },

    labelAnimationMyBreville() {
      const setActive = (el, active) => {
        const formField = el.parentNode.parentNode;
        if (active) {
          formField.classList.add('form-field--is-active');
        } else {
          formField.classList.remove('form-field--is-active');
          el.value === '' ?
            formField.classList.remove('form-field--is-filled') :
            formField.classList.add('form-field--is-filled');
        }
      };

      [].forEach.call(
        document.querySelectorAll('.form-field__input, .form-field__textarea'),
        (el) => {
          el.onblur = () => {
            setActive(el, false);
          };
          el.onfocus = () => {
            setActive(el, true);
          };
          $('.form-field__input').each(function () {
            if ($(this).val()) {
              $(this).parents('.form-field').addClass('form-field--is-filled');
            }
          });
        });
    },

    resendVerificationEmail() {
      const _user = JSON.parse(sessionStorage.getItem('loggedinUser'));
      const _ApiUrl = snro.configService.getAwsApiUrl();
      const userId = _user.profile && _user.profile.user_id;
      const sendVerificationMailObj = {
        'Send_Mail_Verification_Email__c': true
      };
      sendVerificationMailObj = JSON.stringify(sendVerificationMailObj);
      const url = _ApiUrl + '/services/data/updateuser/' + userId;
      $.ajax({
        headers: {
          'Authorization': 'Bearer ' + _user.access_token
        },
        url: url,
        type: 'PATCH',
        dataType: 'text',
        contentType: 'application/json',
        data: sendVerificationMailObj,
        xhr: function () {
          var xhr = jQuery.ajaxSettings.xhr();
          var setRequestHeader = xhr.setRequestHeader;
          xhr.setRequestHeader = function (name, value) {
            if (name === 'X-Requested-With') { return; }
            setRequestHeader.call(this, name, value);
          };
          return xhr;
        },
        success: function (data, textStatus, jqXHR) {
          console.log(data);
          snro.commonUtils.toastNotify('Email Verification mail sent. Please check your mail');
        },
        error: function (jqXHR, textStatus, err) {
          console.log(err);
          snro.commonUtils.toastNotify('Something went wrong. Please try again');
        }
      });
    },

    // init method
    init: function() { // Added since init is mandatory for all modules
      this.find();
      this.updateCache();
      this.modifyAnchorTag();
      this.validateProductSkuCode();
      const self = this; // eslint-disable-line
      $.subscribe('AJAX_CALL_COMPLETED', () => {
        const fullPageSpinner = $('.dialog--full-page-show-on-load');
        if (_cache.spinnerWindow) {
          _cache.spinnerWindow.hide();
        }
        if (fullPageSpinner.length) {
          setTimeout(function() {
            if (!snro.ajaxWrapper.ajaxRequestCount) {
              $(fullPageSpinner)
                .hide();
            }
          });
        }
      });
      $(window).on('load scroll resize', function() {
        self.lazyloadImages();
      });
      this.helpCLick();
      // this.addEllipses();
      // _defineCustomEvents();
      // Adding commonUtils in global space
      if (!window.commonUtils) { // Unless there is another commonUtils js library available globally, add commonUtils to global namespace
        window.commonUtils = this;
      }

    }
  };
}(window, jQuery, window.snro, window.A11yDialog, window.affirm, window.mulberry));
