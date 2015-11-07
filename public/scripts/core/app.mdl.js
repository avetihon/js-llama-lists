(function() {
  'use strict';

  angular
    .module('justDoIt', ['ui.router'])
    .config(config);

  function config($locationProvider, $stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: "/",
        templateUrl: 'users-auth/users-auth.tpl.html',
        controller: 'justDoIt.core.authenticationCtrl'
      })
      .state('registration', {
        url: "/",
        templateUrl: 'users-registration/users-registration.tpl.html',
        controller:'justDoIt.core.registrationCtrl'
      })
      .state('account', {
        url: "/account",
        templateUrl: 'user-account/user-account.tpl.html',
        controller: 'justDoIt.core.accountCtrl',
        controllerAs: "accountVm"
      });

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
  }
})();
