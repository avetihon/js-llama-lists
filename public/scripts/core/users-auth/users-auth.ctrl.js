(function() {
  "use strict";

  angular.module("llamaLists")
    .controller("llamaLists.core.authenticationCtrl", AuthenticationCtrl);

  AuthenticationCtrl.$inject = ["$scope", "$http", "$window", "$location", "$state"];

  function AuthenticationCtrl($scope, $http, $window, $location, $state) {
    var authVm = this;
    authVm.message = "";

    authVm.submitData = function() {

      authVm.user = {
        username: authVm.username,
        password: authVm.password
      };

      $http
        .post("/authenticate", authVm.user)
        .success(function (data, status, headers, config) {
          $window.localStorage.token = data.token;
          $state.go("account");
        })
        .error(function (data, status, headers, config) {
          // Erase the token if the user fails to log in
          delete $window.localStorage.token;
          // Handle login errors here
          authVm.message = "Error: Invalid user or password";
        });
    };
  }

})();
