(function() {
  "use strict";

  angular.module("llamaLists")
    .controller("llamaLists.core.registrationCtrl", RegistrationCtrl);


    RegistrationCtrl.$inject = ["$scope", "$http", "$state"];

    function RegistrationCtrl($scope, $http, $state) {
      var regVm = this;
      regVm.message = "";
      regVm.submitData = function() {

        regVm.user = {
          username: regVm.username,
          email:    regVm.email,
          password: regVm.password
        };

        $http
          .post("/registration", regVm.user)
            .success(function (data, status, headers, config) {
              $state.go("account");
            })
            .error(function (data, status, headers, config) {
              // error
            });
      }
    }

})();
