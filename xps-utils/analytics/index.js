/**
 * This method will get the graphql response and then
 * validate it returning the proper response or not.
 * @returns {*}
 */

let confirmationDataObject = {};
export const analyticsData = (function () {
  const constVal = {
    LINK: 'link',
    REMOVELINK: 'removelink',
    BUTTON: 'button',
    GEN_CLICK_RULE: 'generalClickRule',
    ECOMM_CLICK_RULE: 'ecommClickRule',
    PDP: 'pdp',
    PRODUCT: 'product',
    CART: 'cart',
    CHECKOUT: 'checkout',
    PAYMENT_BTN: 'paymentBtn',
    ADD_TO_CART: 'addToCart',
    EMAIL_SUBMIT: 'emailSubmit',
    SHIP_ADD_SUBMIT: 'shipAddSubmit',
  };

  function updateAnalytics(operation, eveObj) {
    if (eveObj) {
      operation.data = operation.data || [];
      operation.level = operation.level || [];
      operation.data.push(createEventObj(eveObj));
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
      triggerObserverService(operation.trackMsg);
    }

    if (operation.pageLoad) {
      //Triggering analytics onload since data is available after some time(ajax calls)
      triggerObserverService();
    }
  }

  //This is used to trigger observer service with relevant track msg
  function triggerObserverService(trackMsg) {
    window.observerService = window.observerService || [];
    if (trackMsg) {
      //Case of fireEvent click,error etc
      window.observerService.push(['notify', 'fireEvent', { eventName: trackMsg }]);
    } else {
      //Case of page load
      window.observerService.push(['notify', 'pageLoadSuccess']);
    }
  }

  function createEventObj(obj) {
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
        (obj.formStart) ? eveObj.eventInfo.formStart = obj.formStart : '';
        (obj.formComplete) ? eveObj.eventInfo.formComplete = obj.formComplete : '';
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
  }

  function updateAnalyticsData(action, results) {
    try {
      let resultData, productName, productID, basePrice, noOfUnits, productCount, cartBasePrice, currency, productData;
      let products = [], noofUnitsArr = [], cartBasePriceArr = [];
      if (action === 'onload') {
        if (results?.length) {
          for (let i = 0; i < results.length; i++) {
            resultData = results[i]?.variant?.attributesRaw;
            basePrice = results[i].price.value.centAmount;
            currency = results[i].totalPrice.currencyCode;
            noOfUnits = results[i].quantity;
            cartBasePrice = results[i].totalPrice.centAmount / 100;
            for (let j = 0; j < resultData.length; j++) {
              if (resultData[j].name === 'name') {
                productName = JSON.parse(Object.values(resultData[j].value)[0]);
              }
              if (resultData[j].name === 'parentVariant' || resultData[j].name === 'code') {
                if (resultData[j].value.indexOf('_') !== -1) {
                  productID = resultData[j].value.substr(0, resultData[j].value.indexOf('_'));
                } else {
                  productID = resultData[j].value;
                }
              }
              productData = {
                "productName": productName,
                "productID": productID,
                "basePrice": basePrice,
                "noOfUnits": noOfUnits
              }
            }
            products.push(productData);
            noofUnitsArr.push(noOfUnits);
            cartBasePriceArr.push(cartBasePrice);
          }
        }

        productCount = noofUnitsArr.reduce((pv, cv) => pv + cv, 0);
        cartBasePrice = cartBasePriceArr.reduce((pv, cv) => pv + cv, 0);

        const cart = {
          "productCount": productCount,
          "cartBasePrice": cartBasePrice,
          "currency": currency
        };
        updateAnalytics({ pageLoad: true, level: ['products', 'cart'], data: [products, cart] });
      } else if (action === 'remove') {
        const deletedProduct = window.digitalData.products.find((product) => {
          return results === product.productID;
        });
        updateAnalytics({
          trackMsg: constVal.ECOMM_CLICK_RULE
        }, { subType: constVal.LINK, navSubComponent: constVal.REMOVELINK, target: constVal.CART, product: deletedProduct });
      } else {
        updateAnalytics({
          trackMsg: constVal.ECOMM_CLICK_RULE
        }, { navSubComponent: constVal.CHECKOUT, target: constVal.CART });
      }
    } catch (error) {
      console.error( error )
    }
  }

  function updateSearchAnalyticsData(queryString,resultPagesCount) {
    if (queryString) {
        let totalResult = 1, productResult = 1, partResult = 1,
        searchData = {
          keyword:  queryString, 
          resultsPages: totalResult,
          resultCount: resultPagesCount,
          resultCountProduct: productResult,
          resultCountPA: partResult
        };
      updateAnalytics({pageLoad:true, level:['search'],data:[createSearchObject(searchData)]});
    }
  }

  function createSearchObject(data, type) {
    let searchData = {
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
  }

  function updatePageInfo(value) { 
    digitalData.page.pageInfo.pageName = updatePageName(value);
    digitalData.page.pageInfo.pageType = value;
  }

  function updatePageName(value) {
    const { pageName } = digitalData.page.pageInfo;
    return pageName.slice(0, pageName.lastIndexOf(':') + 1) + value;
  }

  function updateProductAndCart( cartData ) {
    let attributesRaw, planid, productName, productID, basePrice, subscriptionPrice, discountPrice, category, stockState, noOfUnits, grind, displayNumber, displayName;
    let lineItem = cartData.lineItems;
    let lineItemLength = lineItem.length;
    let products = [], noofUnitsArr = [];

    for (let i = 0; i < lineItemLength; i++) {
      attributesRaw = lineItem[i].variant.attributesRaw;
      if (attributesRaw && attributesRaw.length >= 1) {
        for (let j = 0; j < attributesRaw.length; j++) {
          if (attributesRaw[j].name === 'name') {
            productName = JSON.parse(Object.values(attributesRaw[j].value)[0]);
          }
        }
      }
      planid = lineItem[i].variant.sku;
      if (planid.includes('PLAN')) {
        planid = planid.substring(planid.indexOf('_')).substring(1);
        if (planid.includes('WEEK')) {
          displayNumber = planid.replace(/^\D+/g, '');
          if (displayNumber === '1') {
            displayName = 'Week';
          } else {
            displayName = 'Weeks';
          }
        } else if (planid.includes('MONTH')) {
          displayNumber = planid.replace(/^\D+/g, '');
          if (displayNumber === '1') {
            displayName = 'Month';
          } else {
            displayName = 'Months';
          }
        }
        planid = displayNumber+' '+displayName;
      } else {
        planid = 'One_Time_Purchase';
      }
      productID = lineItem[i].variant.sku;
      if(productID.includes('_')){
        productID = productID.substr(0, productID.indexOf('_'));
      }else{
        productID = lineItem[i].variant.sku;
      }
      basePrice = (lineItem[i].price.value.centAmount / 100).toFixed(2);
      subscriptionPrice = "";
      discountPrice = "";
      category = "";
      stockState = "";
      noOfUnits = lineItem[i].quantity;
      grind = lineItem[i].custom.customFieldsRaw[0].value;

      noofUnitsArr.push(noOfUnits);

      products.push({
        planid: planid,
        productName: productName,
        productID: productID,
        basePrice: basePrice,
        subscriptionPrice: subscriptionPrice,
        discountPrice: discountPrice,
        category: category,
        stockState: stockState,
        noOfUnits: noOfUnits,
        grind: grind
      });
    }

    const cart = {
      productCount : noofUnitsArr.reduce((pv, cv) => pv + cv, 0),
      cartBasePrice: (cartData.totalPrice.centAmount / 100).toFixed(2),
      currency: cartData.totalPrice.currencyCode
    };

    return {
      products,
      cart
    };
  }

  function updateConfirmationData(data) {
    try {
      Object.keys(data)
      .forEach((key) => {
        let attrName = confirmationDataObject[key];
        if (attrName && !isNaN(attrName)) {
          confirmationDataObject[key] = Object.assign(attrName, data[key]);
        } else {
          confirmationDataObject[key] = data[key];
        }
      });
    } catch (error) {
      console.error( error );
    }
  }

  function updateCheckoutLocalStorage() {
    updateConfirmationData({ products: digitalData.products, cart: digitalData.cart });
    localStorage.setItem('analytics_checkout_data', JSON.stringify(confirmationDataObject));
  }

  function updateConfirmationAnaytics(purchaseNumber) {
    if (localStorage.getItem('analytics_checkout_data')) {
      const confirmationData = JSON.parse(localStorage.getItem('analytics_checkout_data'));
      confirmationData.info.orderId = purchaseNumber;
      const transaction = {
        info: confirmationData.info,
        total: confirmationData.total,
        address: confirmationData.address
      };
      const { cart, products } = confirmationData;
      updateAnalytics({
        pageLoad: true,
        level: ['transaction', 'products', 'cart'],
        data: [transaction,
          products, cart]
      });
      localStorage.removeItem('analytics_checkout_data');
    }
  }

  return {
    updateAnalytics: updateAnalytics,
    constVal: constVal,
    updateAnalyticsData: updateAnalyticsData,
    updateSearchAnalyticsData: updateSearchAnalyticsData,
    createSearchObject: createSearchObject,
    updatePageInfo: updatePageInfo,
    updateConfirmationData: updateConfirmationData,
    updateCheckoutLocalStorage: updateCheckoutLocalStorage,
    updateConfirmationAnaytics: updateConfirmationAnaytics,
    updateProductAndCart: updateProductAndCart
  }
});

