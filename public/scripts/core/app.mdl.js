(function() {
  "use strict";

  angular
    .module("llamaLists", ["ui.router", "ngMessages", "ngResource", "ngAnimate", "exceptionOverride"])
    .config(configRoute)
    .run(configRun);

  configRoute.$inject = ["$locationProvider", "$stateProvider", "$urlRouterProvider"];
  function configRoute($locationProvider, $stateProvider, $urlRouterProvider) {
    $stateProvider
      .state("index", {
        url: "/",
        views: {
          "navbar": {
            templateUrl:  "navbar/navbar-auth/navbar-auth.tpl.html"
          }
        }
      })
      .state("auth", {
        url: "",
        abstract: true,
        views: {
          "navbar": {
            templateUrl:  "navbar/navbar-auth/navbar-auth.tpl.html"
          }
        }
      })
      .state("auth.login", {
        url: "/login",
        views: {
          "content@": {
            templateUrl:  "auth/auth-login/auth-login.tpl.html",
            controller:   "loginPageCtrl",
            controllerAs: "loginVm"
          }
        }
      })
      .state("auth.signup", {
        url: "/signup",
        views: {
          "content@": {
            templateUrl:  "auth/auth-signup/auth-signup.tpl.html",
            controller:   "signupPageCtrl",
            controllerAs: "signupVm"
          }
        }
      })
      .state("main", {
        url: "/main/:username",
        abstract: true,
        views: {
          "navbar": {
            templateUrl:  "navbar/navbar-user/navbar-user.tpl.html",
            controller:   "userNavCtrl",
            controllerAs: "navVm"
          }
        }
      })
      .state("main.lists", {
        url: "/lists",
        views: {
          "content@": {
            templateUrl:  "main/main-lists/main-lists.tpl.html",
            controller:   "listsPageCtrl",
            controllerAs: "listsVm"
          }
        }
      })
      .state("main.interests", {
        url: "/interests",
        views: {
          "content@": {
            templateUrl:  "main/main-interests/main-interests.tpl.html",
            controller:   "interestsPageCtrl",
            controllerAs: "vm"
          }
        }
      })
      .state("main.profile", {
        url: "/profile",
        views: {
          "content@": {
            templateUrl:  "main-profile/main-profile.tpl.html"
          }
        }
      })
      .state("main.profile.account", {
        url: "/account",
        views: {
          "profile": {
            templateUrl:  "main-profile/profile-account/profile-account.tpl.html",
            controller:   "accountPageCtrl",
            controllerAs: "vm"
          }
        }
      })
      .state("main.profile.password", {
        url: "/password",
        views: {
          "profile": {
            templateUrl:  "main-profile/profile-password/profile-password.tpl.html",
            controller:   "passwordPageCtrl",
            controllerAs: "vm"
          }
        }
      })
      .state("404", {
        url: "/404",
        views: {
          "content": {
            templateUrl: "404/404.tpl.html"
          }
        }
      });

    $urlRouterProvider.otherwise("/404");
    $locationProvider.html5Mode(true);
  }

  /* set body id for css style */
  configRun.$inject = ["$rootScope"];
  function configRun($rootScope) {
    $rootScope.$on('$stateChangeSuccess', function(event, toState){
      var stateNames = toState.name.split(".");
      document.body.id = stateNames[stateNames.length - 1] + "-page";
    });
  }
})();
