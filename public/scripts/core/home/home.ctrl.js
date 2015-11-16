(function() {
  "use strict";

  angular.module("llamaLists")
    .controller("homeCtrl", homeCtrl);

    homeCtrl.$inject = ["$window", "$state", "$rootScope"];
    function homeCtrl($window, $state, $rootScope) {
      var homeVm = this;

      $rootScope.showLogout = false;

      homeVm.makeLogout = function() {
        delete $window.localStorage.token;
        $state.go("login");
        $rootScope.showLogout = false;
      }
    }
})();
