(function() {
  'use strict';

  angular
    .module('llamaLists', ['ui.router', 'ngMessages', 'ngResource', 'ngAnimate'])
    .config(configure)
    .run(runBlock);


  configure.$inject = ["$locationProvider", "$stateProvider", "$urlRouterProvider", '$httpProvider', 'configRouter', 'configInterceptors'];
  function configure($locationProvider, $stateProvider, $urlRouterProvider, $httpProvider, configRouter, configInterceptors) {
    configRouter($locationProvider, $stateProvider, $urlRouterProvider);
    configInterceptors($httpProvider);
  }
  /* set body id for css style */
  runBlock.$inject = ['stateChangeSuccess', 'stateChangeError'];
  function runBlock(stateChangeSuccess, stateChangeError) {
    stateChangeSuccess.initialize();
    stateChangeError.initialize();
  }
})();
