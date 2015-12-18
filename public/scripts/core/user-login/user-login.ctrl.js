(function() {
  "use strict";

  angular.module("llamaLists")
    .controller("llamaLists.core.user-login.loginPageCtrl", LoginPageCtrl);

  LoginPageCtrl.$inject = ["$scope", "$http", "$window", "$location", "$state"];
  function LoginPageCtrl($scope, $http, $window, $location, $state) {
    var loginVm = this;

    loginVm.submitData = function(validation) {
      loginVm.submitted = true;

      if (validation) {
        loginVm.user = {
          username: loginVm.username,
          password: loginVm.password
        };

        $http
          .post("/login", loginVm.user)
          .success(function (data, status, headers, config) {
            $window.localStorage.token = data.token;
            $state.go("home");
          })
          .error(function (data, status, headers, config) {
            loginVm.message = {};
            // Erase the token if the user fails to log in
            delete $window.localStorage.token;
            // Handle login errors here
            loginVm.message = data.message;

            $scope.$watchGroup(
              ["loginVm.username", "loginVm.password"],
              function handleInputChange(newValues, oldValues) {
                  if (!angular.equals(newValues,oldValues)) {
                    loginVm.message = null;
                  }
              }
            );
          });
      }
    };
  }

})();
