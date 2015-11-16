(function() {
  "use strict";

  angular
    .module("llamaLists", ["ui.router"])
    .config(ConfigRoute);

  ConfigRoute.$inject = ["$locationProvider", "$stateProvider", "$urlRouterProvider"];
  function ConfigRoute($locationProvider, $stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("login", {
        url:          "/login",
        templateUrl:  "users-auth/users-auth.tpl.html",
        controller:   "llamaLists.core.authenticationCtrl",
        controllerAs: "authVm"
      })
      .state("registration", {
        url:          "/registration",
        templateUrl:  "users-registration/users-registration.tpl.html",
        controller:   "llamaLists.core.registrationCtrl",
        controllerAs: "regVm"
      })
      .state("account", {
        url:          "/account",
        templateUrl:  "user-account/user-account.tpl.html",
        controller:   "llamaLists.core.accountCtrl",
        controllerAs: "accountVm"
      });

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
  }
})();
