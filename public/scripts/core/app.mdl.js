(function() {
  'use strict';

  angular
    .module('meanJustDoIt', ['ui.router'])
    .config(config);

  function config($locationProvider, $stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: "/",
        templateUrl: 'users-auth/users-auth.tpl.html',
        controller: 'AuthenticationCtrl'
      })
      .state('registration', {
        url: "/",
        templateUrl: 'users-registration/users-registration.tpl.html',
        controller:'RegistrationCtrl'
      })
      .state('account', {
        url: "/account",
        templateUrl: 'user-account/user-account.tpl.html',
        controller: 'AccountCtrl',
        controllerAs: "accountVm"
      });

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
  }
})();