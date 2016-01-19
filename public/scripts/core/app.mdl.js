(function() {
  "use strict";

  angular
    .module("llamaLists", ["ui.router", "ngMessages", "ngAnimate", "exceptionOverride"])
    .config(configRoute)
    .run(configRun);

  configRoute.$inject = ["$locationProvider", "$stateProvider", "$urlRouterProvider"];
  function configRoute($locationProvider, $stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("index", {
        url: "/",
        views: {
          "navbar": {
            templateUrl:  "navbar/auth-navbar/auth-navbar.tpl.html"
          }
        }
      })
      .state("login", {
        url: "/login",
        views: {
          "navbar": {
            templateUrl:  "navbar/auth-navbar/auth-navbar.tpl.html"
          },
          "content": {
            templateUrl:  "user-login/user-login.tpl.html",
            controller:   "llamaLists.core.user-login.loginPageCtrl",
            controllerAs: "loginVm"
          }
        }
      })
      .state("signup", {
        url: "/signup",
        views: {
          "navbar": {
            templateUrl:  "navbar/auth-navbar/auth-navbar.tpl.html"
          },
          "content": {
            templateUrl:  "user-signup/user-signup.tpl.html",
            controller:   "llamaLists.core.user-signup.signupPageCtrl",
            controllerAs: "signupVm"
          }
        }
      })
      .state("home", {
        url: "/home",
        views: {
          "navbar": {
            templateUrl:  "navbar/user-navbar/user-navbar.tpl.html",
            controller:   "llamaLists.core.navbar.user-navbar.userNavCtrl",
            controllerAs: "navVm"
          },
          "content": {
            templateUrl:  "user-home/user-home.tpl.html",
            controller:   "llamaLists.core.user-home.homePageCtrl",
            controllerAs: "homeVm"
          }
        }
      })
      .state("profile", {
        url:          "/profile",
        templateUrl:  "user-profile/user-profile.tpl.html",
        controller:   "llamaLists.core.user-profile.profilePageCtrl",
        controllerAs: "profileVm"
      });

    $urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
  }

  /* set body id for css style */
  configRun.$inject = ["$rootScope"];
  function configRun($rootScope) {
    $rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
      document.body.id = toState.name + "-page";
    });
  }
})();
