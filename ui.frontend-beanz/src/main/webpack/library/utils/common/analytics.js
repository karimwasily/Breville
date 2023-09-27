/*!
 * analytics.js

 * This file contains Analytics related functions
 *
 * @project:    Beanz Rewrite
 * @date:       2021-05-12
 * @author:     Mahesh
 * @licensor:   Breville
 * @namespaces: snro
 */

/* eslint-disable new-cap */

//this will cause the browser to check for errors more aggressively
'use strict';
/**
 * @namespace Main
 * @memberof snro
 * @property {null} property - description of property
 */
(function(window, $, snro, digitalData) {
  snro = window.snro = snro || {};
  const _cache = {};

  snro.analytics = {
    moduleName: 'analytics', // Added for debug logs

    updateCache() {
      _cache.confirmationData = {};
    },

    //TODO : Updates the digitalData and accepts target. and target.data to push
    updateAnalytics(operation, eveObj) {

      if (eveObj) {
        operation.data = operation.data || [];
        operation.level = operation.level || [];
        operation.data.push(this.createEventObj(eveObj));
        operation.level.push('event');
      }

      //Looping and updating digitalData
      for (let i = 0; i < operation.level.length; i++) {
        const root = operation.level[i];
        digitalData[root] = operation.data[i];
        console.log(root); 
      }

      if (operation.trackMsg) {
        //Triggering analytics observer service mechanism
        this.triggerObserverService(operation.trackMsg);
      }

      if (operation.pageLoad) {
        //Triggering analytics onload since data is available after some time(ajax calls)
        this.triggerObserverService();
      }
    },

    //This is used to trigger observer service with relevant track msg
    triggerObserverService(trackMsg) {
      window.observerService = window.observerService || [];
      if (trackMsg) {
        //Case of fireEvent click,error etc
        window.observerService.push(['notify', 'fireEvent', { eventName: trackMsg }]);
      } else {
        //Case of page load
        window.observerService.push(['notify', 'pageLoadSuccess']);
      }
    },

    createEventObj(obj) {
      const eveObj = {
        type: obj.type || 'click',
        subType: obj.subType || 'button',
        eventInfo: {}
      };

      switch (obj.target) {
      case 'form':
        eveObj.type = 'load';
        eveObj.subType = 'form';
        eveObj.eventInfo.formName = obj.formName;
        eveObj.eventInfo.formStep = obj.formStep;
        (obj.formStart) ? eveObj.eventInfo.formStart = obj.formStart: '';
        (obj.formComplete) ? eveObj.eventInfo.formComplete = obj.formComplete: '';
        break;

      case 'search':
        eveObj.eventInfo.searchResultCategory = obj.searchResultCategory;
        eveObj.eventInfo.searchResult = obj.searchResult;
        eveObj.eventInfo.searchResultPosition = obj.searchResultPosition;
        break;

      case 'product': //general cases where product is to be part of event object
        eveObj.eventInfo.navComponent = obj.navComponent;
        eveObj.eventInfo.navSubComponent = obj.navSubComponent;
        eveObj.product = obj.product;
        break;

      case 'cart':
        eveObj.eventInfo.navComponent = 'cart';
        eveObj.eventInfo.navSubComponent = obj.navSubComponent;
        (obj.product) ? (eveObj.product = obj.product) : '';
        break;

      case 'testimonial':
        eveObj.eventInfo.navComponent = obj.navComponent;
        eveObj.eventInfo.navSubComponent = obj.navSubComponent;
        eveObj.eventInfo.product = obj.product;
        eveObj.eventInfo.testimonial = obj.testimonial;
        break;

      default: //home | compare | global_nav | live_chat
        eveObj.eventInfo.navComponent = obj.navComponent;
        eveObj.eventInfo.navSubComponent = obj.navSubComponent;
      }

      return eveObj;
    },

    createSearchObject(data, type) {
      const searchData = {
        keyword: data.keyword,
        resultsPages: data.resultsPages,
        resultCount: data.resultCount
      };
      if (type === 'product') {
        searchData.resultCountProduct = data.resultCountProduct;
      } else if (type === 'partAccessory') {
        searchData.resultCountPA = data.resultCountPA;
      } else {
        searchData.resultCountProduct = data.resultCountProduct;
        searchData.resultCountPA = data.resultCountPA;
      }
      return searchData;
    },

    // This method will update the digitalData Object with error in ajax calls
    updateAnalyticsWithError(errorObject) {
      const { jqXHR, requestId, url } = errorObject;
      if (jqXHR.status !== 200) {
        const errorData = {
          errorType: 'API_ERROR', // fix API_ERROR
          errorCode: jqXHR.status || 999, // 404
          errorMessage: `${jqXHR.statusText} ${requestId}`, // Not found
          errorSubType: url, // URL
        };
        digitalData.error = window.digitalData.error || {};
        digitalData.error = errorData;
        this.triggerObserverService('errorDirectRule');
      }
    },

    //This method will replace old analytics method
    updateDigitalData(operation, eveObj) {
      operation.data = operation.data || [];
      operation.level = operation.level || []; //eg. product, cart, transaction,event etc

      if (eveObj) {
        operation.data.push(eveObj);
        operation.level.push('event');
      }

      //Looping and updating digitalData
      for (let i = 0; i < operation.level.length; i++) {
        const root = operation.level[i];
        digitalData[root] = operation.data[i];
      }

      if (operation.trackMsg) {
        //Triggering analytics observer service mechanism
        this.triggerObserverService(operation.trackMsg);
      }

      if (operation.pageLoad) {
        //Triggering analytics onload since data is available after some time(ajax calls)
        this.triggerObserverService();
      }
    },

    updatePageInfo(value) { 
      digitalData.page.pageInfo.pageName = this.updatePageName(value);
      digitalData.page.pageInfo.pageType = value;
    },

    updatePageName(value) {
      const { pageName } = digitalData.page.pageInfo;
      return pageName.slice(0, pageName.lastIndexOf(':') + 1) + value;
    },

    updateProductAndCart({ results }) {
      var subscriptionplan, subscriptionLength, selected, planid, productID, counter, subscriptionPlanID;
      var productName, basePrice, subscriptionPrice, discountPrice, color, category, stockState, noOfUnits, grind;
      var products = [];
      var lineItem = results.lineItems;
      var lineItemLength = lineItem.length;

      for (var i = 0; i < lineItemLength; i++) {
        counter = 0;
        subscriptionplan = lineItem[i].subscriptionplan;
        subscriptionLength = subscriptionplan.length;
        productName = lineItem[i].displayName;
        productID = lineItem[i].variationCode;
        basePrice = lineItem[i].price.itemListPrice.amount;
        subscriptionPrice = lineItem[i].price.listPrice.amount;
        discountPrice = (lineItem[i].price.itemListPrice.amount - lineItem[i].price.listPrice.amount).toFixed(2);
        color = lineItem[i].colorDisplayName;
        category = '';
        stockState = lineItem[i].availability === 'AVAILABLE';
        noOfUnits = lineItem[i].quantity;
        grind = lineItem[i].grind;
        if (subscriptionLength >= 1) {
          for (var j = 0; j < subscriptionLength; j++) {
            selected = subscriptionplan[j].selected;
            if (selected === 'true') {
              planid = subscriptionplan[j].planid;
              subscriptionPlanID = planid;
              counter = 1;
            }
          }
        }
        if (subscriptionLength >= 1 && counter === 0) {
          planid = 'One_Time_Purchase';
        } else if (counter === 1) {
          planid = subscriptionPlanID;
        } else {
          planid = '';
        }
        products.push({
          planid: planid,
          productName: productName,
          productID: productID,
          basePrice: basePrice,
          subscriptionPrice: subscriptionPrice,
          discountPrice: discountPrice,
          color: color,
          category: category,
          stockState: stockState,
          noOfUnits: noOfUnits,
          grind: grind
        });
      }

      const cart = {
        productCount: results.totalQuantity,
        cartBasePrice: results.totalPrice.amount,
        currency: results.totalPrice.currency
      };

      return {
        products,
        cart
      };
    },

    updateConfirmationData(data) {
      Object.keys(data)
        .forEach((key) => {
          const attrName = _cache.confirmationData[key];
          if (attrName) {
            _cache.confirmationData[key] = Object.assign(attrName, data[key]);
          } else {
            _cache.confirmationData[key] = data[key];
          }
        });
    },

    updateCheckoutLocalStorage() {
      this.updateConfirmationData({ products: digitalData.products, cart: digitalData.cart });
      localStorage.setItem('analytics_checkout_data', JSON.stringify(_cache.confirmationData));
    },

    updateConfirmationAnaytics(purchaseNumber) {
      if (localStorage.getItem('analytics_checkout_data')) {
        const confirmationData = JSON.parse(localStorage.getItem('analytics_checkout_data'));
        confirmationData.info.orderId = purchaseNumber;
        const transaction = {
          info: confirmationData.info,
          total: confirmationData.total,
          address: confirmationData.address
        };
        const { cart, products } = confirmationData;
        this.updateAnalytics({
          pageLoad: true,
          level: ['transaction', 'products', 'cart'],
          data: [transaction,
            products, cart]
        });
        localStorage.removeItem('analytics_checkout_data');
      }
    },

    //Used in case of contextEventTrigger (testimonial)
    triggerContextEvent(basicEventObj){
      window.s ? window.s.contextEventTrigger({'event':this.createEventObj(basicEventObj)}): '';
    },

    bindEvents() {
      $(document)
        .on('click', '[data-analytics]', (event) => {
          event.preventDefault();
          const element = $(event.currentTarget);
          this.updateDigitalData(element.data('analytics')
            .operation, element.data('analytics')
            .eventObj);
          if(element.attr('href')) {
            snro.commonUtils.winOpen(element.attr('href'), $(element)
            .attr('target'));
          }
        });
    },

    // init method
    init: function() { // Added since init is mandatory for all modules
      // Adding analytics in global space
      if (!window.analytics) { // Unless there is another analytics js library available globally, add analytics to global namespace
        window.analytics = this;
      }
      this.updateCache();
      this.bindEvents();
    }
  };
}(window, window.jQuery, window.snro, window.digitalData));

