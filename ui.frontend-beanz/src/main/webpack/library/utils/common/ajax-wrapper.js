/*!
 * ajax.wrapper.js
 * This file contians ajax wrapper method that handles all ajax calls
 *
 * @project   Beanz Rewrite
 * @date      2021-05-12
 * @author    Mahesh
 * @dependencies jQuery
 * @namespaces: snro
 */
 //this will cause the browser to check for errors more aggressively
 'use strict';
 /**
  * @namespace ajaxWrapper
  * @memberof breville
  * @property {null} property - description of property
  */

(function(window, $, snro, mgr, _user, store) {
   snro = window.snro = snro || {};
   let __user = null;
   __user = JSON.parse(sessionStorage.getItem('loggedinUser'));
   snro.ajaxWrapper = {
     moduleName: 'ajaxWrapper', // Added for debug logs
     ajaxRequestCount: 0,
     spinnerDialog: null,
     xhrPool: {
       name: 'xhrPool'
     },
     getUser() {
       mgr.getUser().then(function(user) {
        _user = user;
         console.log(user);
       }).catch(function(err) {
         console.log(err);
       });
     },
     getXhrObj: function(options, header, callback, complete) {
       let
         self = this, // eslint-disable-line
         ajaxOptions, // eslint-disable-line
         defaultOptions = { // eslint-disable-line
           type: 'POST',
           async: true,
           cache: false,
           url: '',
           data: {},
           headers: (header === 'awsApiHeader') ? this.getReqHeaders() : '',
           dataType: 'json',
           loaderRef: null,
           moduleName: null,
           tryCount: 0,
           retryLimit: 2,
           timeout: 30000,
           beforeSend: function(jqXHR) {
             //TODO : collect and persist jqXHR header req id and send in .fail
             snro.ajaxWrapper.ajaxRequestCount++;
             if (ajaxOptions.cancellable) {
               if (self.xhrPool[ajaxOptions.url]) {
                 self.xhrPool[ajaxOptions.url].abort();
                 self.xhrPool[ajaxOptions.url] = jqXHR;
               } else {
                 self.xhrPool[ajaxOptions.url] = jqXHR;
               }
             }
             if (ajaxOptions.loader && ajaxOptions.loader.length) {
               // Check if target type is a button or link
               if (ajaxOptions.loader.hasClass('loader-btn')) {
                 self.loaderRef = snro.commonUtils.loader()
                   .insertAfter(ajaxOptions.loader);
               } else {
                 self.loaderRef = snro.commonUtils.loader()
                   .target(ajaxOptions.loader);
               }
             }
           },
           cancellable: false, // By default allow multiple request on one URL
           loader: null // Specify a target element where loader needs to be shown
         };
       ajaxOptions = $.extend({}, defaultOptions, options);
       
       if (__user && __user.id_token) {
         const ajaxOptionsUrlSplit = ajaxOptions && ajaxOptions.url && ajaxOptions.url.split('/');
         const awsApiConfig = $('header').data('aws-api-config') || {};
         console.log(awsApiConfig);
         const reqHeadersAjaxOptions = {
           'X-ep-user-id': __user && __user.profile && __user.profile.user_id,
           'X-ep-user-Roles': 'REGISTERED',
           'X-ep-user-scopes': 'BrevilleUSMP',
           'Content-Type': 'application/json',
           'X-Request-Id': Date.now(),
           'X-Ep-User-Traits': 'LOCALE=en-US',
           'X-Ep-Token': __user && __user.id_token
         };
         if (ajaxOptions.url.includes(snro.configService.getAwsApiUrl()  + '/cart/' + ajaxOptionsUrlSplit[ajaxOptionsUrlSplit.length - 1]) && store.get('cart_id') !== (ajaxOptionsUrlSplit && ajaxOptionsUrlSplit[ajaxOptionsUrlSplit.length - 1])) {
          const getCartId = store.get('cart_id');
          const ajaxUrlArray = ajaxOptionsUrlSplit;
           ajaxUrlArray[ajaxUrlArray.length - 1] = getCartId;
           ajaxOptions.url = ajaxUrlArray.join('/');
           ajaxOptions.headers = reqHeadersAjaxOptions;
         } else if (ajaxOptions.url.includes(snro.configService.getAwsApiUrl() + '/products/') && ajaxOptions.url.includes('priceandavailability') && typeof ajaxOptions.headers === 'undefined' && !('headers' in ajaxOptions)) {
           ajaxOptions.headers = reqHeadersAjaxOptions;
           snro.cartService.loadCart();
         }
       }
       return $.ajax(ajaxOptions)
         .done(function(data, status, jqXHR) {
           $.each(self.xhrPool, function(url, xhrObj) {
             if (xhrObj === jqXHR) {
               delete self.xhrPool[url];
               return false;
             }
           });
           self.applyCallback(this, arguments, callback); // eslint-disable-line
         })
         .fail(function(jqXHR) {
          //const requestId = (this.headers !== '') ? this.headers['X-Request-Id'] : '';
           /*Added to handle aborted requests, as analytics error should not be triggered in such cases*/
           if(jqXHR.statusText !== 'abort') {
             //TO-DO
            // snro.analytics.updateAnalyticsWithError({ requestId, jqXHR, url: this.url });
           }
           if (jqXHR.statusText === 'timeout') {
             ajaxOptions.tryCount++;
             if (ajaxOptions.tryCount < ajaxOptions.retryLimit) {
               const retryCount = {
                   tryCount: ajaxOptions.tryCount,
                   timeout: 2 * ajaxOptions.timeout
                 },
                 retryOptions = $.extend({}, ajaxOptions, retryCount);
               snro.ajaxWrapper.getXhrObj(retryOptions, header, callback, complete);
               return;
             } else {
               $.each(self.xhrPool, function(url, xhrObj) {
                 if (xhrObj === jqXHR) {
                   delete self.xhrPool[url];
                   return false;
                 }
               });
               self.applyCallback(this, arguments, callback); // eslint-disable-line
             }
           } else {
             $.each(self.xhrPool, function(url, xhrObj) {
               if (xhrObj === jqXHR) {
                 delete self.xhrPool[url];
                 return false;
               }
             });
             self.applyCallback(this, arguments, callback); // eslint-disable-line
           }
         })
         .always(function() {
           self.ajaxRequestCount--;
           if (self.ajaxRequestCount === 0) {
             $.publish('AJAX_CALL_COMPLETED');
           }
           if (self.loaderRef && self.loaderRef.length) {
             self.loaderRef.remove();
           }
           if (!complete) {
             if (ajaxOptions.tryCount >= ajaxOptions.retryLimit) {
               return;
             } else {
               return false;
             }
           } else {
             complete.apply(this, arguments); // eslint-disable-line
           }
         });
     },
     applyCallback: function($this, $arguments, $callback) {
       if (!$callback) {
         return;
       }
       $callback.apply($this, $arguments);
     },
     getReqHeaders: function(contentType) {
       const awsApiConfig = $('nav').data('aws-api-config') || {};
       const uuid_storage_key = store.get('uuid_storage_key'); // eslint-disable-line
       const store_storage_key = store.get('store_storage_key'); // eslint-disable-line
       const mergeCartURL = snro.configService.getAwsApiUrl()  + '/cart/merge-cart';
       //Temporarily changes, will be removed once BE changes are done.
       const reqHeaders = {
         'X-ep-user-id': __user && __user.profile && __user.profile.user_id,
         'X-ep-user-Roles': 'REGISTERED',
         'X-ep-user-scopes':  'BrevilleUSMP',
         'Content-Type': (contentType !== undefined) ? contentType : 'application/json',
         'X-Ep-User-Traits': awsApiConfig.siteLocale ? awsApiConfig.siteLocale : 'LOCALE=en-US',
         'X-Ep-Token': __user && __user.id_token
       };
       if (__user && __user.id_token) {
         if (uuid_storage_key && store_storage_key && store.get('uuid_storage_key') !== __user.profile.user_id) { // eslint-disable-line
           let updateObj = {
             'type': 'events/roleTransitionEvent',
             'oldUserGuid': snro.userService.getUUID() + 'BrevilleUSMP',
             'newUserGuid': __user.profile && __user.profile.user_id,
             'oldRole': 'PUBLIC',
             'newRole': 'REGISTERED'
           };
           updateObj = JSON.stringify(updateObj);
           $('#spinner__dialog').show();
           $.ajax({
             headers: reqHeaders,
             url: snro.configService.getAwsApiUrl()  + '/profile?_=' + Date.now(),
             async: false,
             type: 'GET',
             dataType: 'text',
             success: function (data, textStatus, jqXHR) {
               $.ajax(mergeCartURL, {
                 type: 'POST',
                 async: false,
                 dataType: 'text',
                 contentType: 'application/json',
                 headers: reqHeaders,
                 data: updateObj,
                 success: function (data, status, xhr) {
                   store.set('uuid_storage_key', __user && __user.profile && __user.profile.user_id);
                   store.set('store_storage_key', 'BrevilleUSMP');
                   $.ajax({
                     headers: reqHeaders,
                     url: snro.configService.getAwsApiUrl() + '/cart?_=' + Date.now(),
                     async: false,
                     type: 'GET',
                     dataType: 'text',
                     success: function (data, textStatus, jqXHR) {
                      $('#spinner__dialog').hide();
                       const cLocationParts = jqXHR.getResponseHeader('clocation').split('/'),
                         _cartId = cLocationParts[cLocationParts.length - 1];
                       store.set('cart_id', _cartId);
                       console.log(reqHeaders);
                       $.publish('mergeCartSuccess', { 'mergeCartDone': true });
                     },
                     error: function (jqXHR, textStatus, err) {
                       console.log(err);
                       $('#spinner__dialog').hide();
                       snro.commonUtils.toastNotify('Something went wrong. Please try again');
                     }
                   });
                 },
                 error: function (jqXhr, textStatus, errorMessage) {
                   console.log(errorMessage);
                   $('#spinner__dialog').hide();
                 }
               });
             },
             error: function (jqXHR, textStatus, err) {
               console.log(err);
               $('#spinner__dialog').hide();
             }
           });
         } else {
           if (!uuid_storage_key && !store_storage_key) { // eslint-disable-line
             store.set('uuid_storage_key', __user && __user.profile && __user.profile.user_id);
             store.set('store_storage_key', 'BrevilleUSMP');
           }
           const reqHeadersClonedObj = Object.assign(reqHeaders, { 'X-Request-Id': Date.now() });
           return reqHeadersClonedObj;
         }
       } else {
         return {
         'X-ep-user-id': snro.userService.getUUID() + (awsApiConfig.userScope ? awsApiConfig.userScope : 'BrevilleUSMP'),
         'X-ep-user-Roles': awsApiConfig.awsApiRole ? awsApiConfig.awsApiRole : 'PUBLIC',
         'X-ep-user-scopes': awsApiConfig.awsApiUrl ? awsApiConfig.userScope : 'BrevilleUSMP',
         'Content-Type': (contentType !== undefined) ? contentType : 'application/json',
         'X-Ep-User-Traits': awsApiConfig.siteLocale ? awsApiConfig.siteLocale : 'LOCALE=en-US'
       };
       }
     },
     init: function() {
     // Since init is mandatory
       if (!window.ajaxWrapper) {
         window.ajaxWrapper = this;
       }
     }
   };
 }(window, jQuery, window.snro,window.mgr,window._user,window.store));