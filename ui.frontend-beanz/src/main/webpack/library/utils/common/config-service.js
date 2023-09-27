
/*
 * config-service.js
 * [ This javascript code will be used for serve site level configurations. ]
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

(function(window, $, snro) {
  snro = window.snro = snro || {};

  const _cache = {};
  let _awsApiUrl;
  snro.configService = {
    moduleName: 'configService',

    // assignment of dom selectors to variables
    updateCache: function updateCache() {
      _cache.urlConfigEle = $('[data-aws-api-url]');
    },

    // bind dom events
    //bindEvents() {},

    getAwsApiUrl() {
      if (!_awsApiUrl) {
        if (_cache.urlConfigEle.length && _cache.urlConfigEle.data('awsApiUrl')) {
          _awsApiUrl = _cache.urlConfigEle.data('awsApiUrl');
        }
      }
      return _awsApiUrl;
    },

    // Module initialization
    init() {
      this.updateCache();
      this.bindEvents();
    }
  };
})(window, window.jQuery, window.snro);

