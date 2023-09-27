//this will cause the browser to check for errors more aggressively
'use strict';

var snro = window.snro || {};

// self executing function to perform core tasks

$(function () {
  const moduleArray = ['configService', 'ajaxWrapper', 'commonUtils', 'userService', 'analytics'];

  //tiny-pubsub plugin -- Need to import via webpack
  var o = $({});

  $.subscribe = function () {
    o.on.apply(o, arguments); //eslint-disable-line
  };

  $.unsubscribe = function () {
    o.off.apply(o, arguments);//eslint-disable-line
  };

  $.publish = function () {
    o.trigger.apply(o, arguments); //eslint-disable-line
  };
  
  // check of all available selectors to initialize corresponsing modules
  $.each(moduleArray, function (index, value) {
    try {
      // initialize the current module
      snro[value].init();
    } catch (e) {
      // catch error, if any, while initialing module
      console.log('No init function');
    }
  });
});
