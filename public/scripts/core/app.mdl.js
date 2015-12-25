(function() {
  "use strict";

  angular
    .module("llamaLists", ["ui.router", "ngMessages", "ngAnimate", "exceptionOverride"])
    .config(configRoute)
    .run(configRun);

  configRoute.$inject = ["$locationProvider", "$stateProvider", "$urlRouterProvider"];
  function configRoute($locationProvider, $stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("login", {
        url:          "/login",
        templateUrl:  "user-login/user-login.tpl.html",
        controller:   "llamaLists.core.user-login.loginPageCtrl",
        controllerAs: "loginVm"
      })
      .state("signup", {
        url:          "/signup",
        templateUrl:  "user-signup/user-signup.tpl.html",
        controller:   "llamaLists.core.user-signup.signupPageCtrl",
        controllerAs: "signupVm"
      })
      .state("home", {
        url:          "/home",
        templateUrl:  "user-home/user-home.tpl.html",
        controller:   "llamaLists.core.user-home.homePageCtrl",
        controllerAs: "homeVm"
      });

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
  }

  /* set body id for css style */
  configRun.$inject = ["$rootScope"];
  function configRun($rootScope) {
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
      document.body.id = toState.name + "-page";

      switch (toState.name) {
        case "home":
          angular.element(document.querySelectorAll(".navbar-auth")).css("display", "none");

          // reset
          angular.element(document.querySelector(".dropdown")).css("display", "inline");
          break;
        case "signup":
        case "login":
          angular.element(document.querySelector(".dropdown")).css("display", "none");
          break;
      }
    });
  }
})();
