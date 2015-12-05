(function() {
  "use strict";

  angular.module("llamaLists")
    .controller("llamaLists.core.authenticationCtrl", AuthenticationCtrl);

  AuthenticationCtrl.$inject = ["$scope", "$http", "$window", "$location", "$state"];

  function AuthenticationCtrl($scope, $http, $window, $location, $state) {
    var authVm = this;

    authVm.submitData = function(validation) {
      authVm.submitted = true;

      if (validation) {
        authVm.user = {
          username: authVm.username,
          password: authVm.password
        };

        $http
          .post("/login", authVm.user)
          .success(function (data, status, headers, config) {
            $window.localStorage.token = data.token;
            $state.go("account");
          })
          .error(function (data, status, headers, config) {
            authVm.message = {};
            // Erase the token if the user fails to log in
            delete $window.localStorage.token;
            // Handle login errors here
            authVm.message = data.message;

            $scope.$watchGroup(
              ["authVm.username", "authVm.password"],
              function handleInputChange(newValues, oldValues) {
                  if (!angular.equals(newValues,oldValues)) {
                    authVm.message = null;
                  }
              }
            );
          });
      }
    };
  }

})();
