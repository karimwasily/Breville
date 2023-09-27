/* eslint no-console: 0 */
/*
 * User-Service.js
 * [ This javascript code will validate the live chat. ]
 *
 * @project:    Beanz Rewrite
 * @date:       2021-05-12
 * @author:     Mahesh
 * @licensor:   Breville
 * @namespaces: snro
 */

//this will cause the browser to check for errors more aggressively
'use strict';

/**
 * @namespace
 * @memberof Breville
 * @property {null} property - description of property
 */

 export const utility = (answered) => {
  const authToken = JSON.parse(localStorage.getItem('session'));
  let queryparam = [];

  Object.keys(answered).forEach(function (key) {
    queryparam.push(answered[key].facet + ':' + answered[key].ansId);
  });
  queryparam = queryparam.toString().replaceAll(',', '&');

  const url = "https://7vxoutoin3.execute-api.us-west-2.amazonaws.com/BeanzUS/search/" + queryparam,
    options = {
      async: true,
      url: url,
      type: 'GET',
      dataType: 'json',
      beforeSend: function (xhr) {
        xhr.setRequestHeader("authorization", authToken.tokenInfo.token_type + ' ' + authToken.tokenInfo.access_token);
      },
    };

  snro.ajaxWrapper.getXhrObj(options).done((data) => {
    if (data) {
      const actualData = JSON.stringify(data, undefined, 2);
      document.getElementById("ctData").innerHTML = actualData;
    }
  }).fail(err => {
    console.log(err);
  });
};
 
(function(window, $, snro, store) {

  snro = window.snro = snro || {};

  snro.userService = {
    moduleName: 'userService',

    // assignment of dom selectors to variables
    getAuthToken() {
      const date = new Date();
      const expireAt = Math.floor(date / 1000);
    
      const url = "https://7vxoutoin3.execute-api.us-west-2.amazonaws.com/BeanzUS/oauth/anonymous/1111",
        options = {
          async: true,
          url: url,
          type: 'POST',
          dataType: 'json'
        };
    
      snro.ajaxWrapper.getXhrObj(options).done((data) => {
        if (data) {
          data = JSON.parse(data);
          data.expires_at = expireAt + data.expires_in; // eslint-disable-line
          const authToken = {
            authenticated: false,
            channel: null,
            country: "",
            currency: "",
            locale: "",
            storeName: null,
            tokenInfo: data
          };
          localStorage.setItem('session', JSON.stringify(authToken, null, '\t'));
          this.refreshToken();
        }
      }).fail(err => {
        console.log(err);
      });
    },

    refreshToken() {
      const authToken = JSON.parse(localStorage.getItem('session'));
      const accessToken = authToken.tokenInfo.access_token;
      const refreshToken = authToken.tokenInfo.refresh_token;
      if (!accessToken) {
        const url = "https://7vxoutoin3.execute-api.us-west-2.amazonaws.com/BeanzUS/oauth/refresh-token/" + refreshToken,
          options = {
            async: true,
            url: url,
            type: 'POST',
            dataType: 'json'
          };
    
        snro.ajaxWrapper.getXhrObj(options).done((data) => {
          if (data) {
            const refreshTokenData = JSON.parse(data);
            authToken.tokenInfo.access_token = refreshTokenData.access_token; // eslint-disable-line
            localStorage.setItem('session', JSON.stringify(authToken, null, '\t'));
          }
        }).fail(err => {
          console.log(err);
        });
      }
    },

    // Module initialization
    init() {
      this.getAuthToken();
    }

  };
})(window, window.jQuery, window.snro, window.store);