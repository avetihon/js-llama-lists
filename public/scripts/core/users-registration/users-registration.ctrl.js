(function() {
  "use strict";

  angular.module("llamaLists")
    .controller("llamaLists.core.registrationCtrl", RegistrationCtrl);


    RegistrationCtrl.$inject = ["$scope", "$http", "$state"];

    function RegistrationCtrl($scope, $http, $state) {
      var regVm = this;
      regVm.submitData = function(validation) {
        regVm.submitted = true;

        if (validation) {
          regVm.user = {
            username: regVm.userName,
            email:    regVm.userEmail,
            password: regVm.userPassword
          };

          $http
            .post("/signup", regVm.user)
              .success(function (data, status, headers, config) {
                $state.go("login");
              })
              .error(function (data, status, headers, config) {
                regVm.message = {};
                if (data.type == 1) {
                  regVm.message.name = data.message;
                } else if (data.type == 2) {
                  regVm.message.email = data.message;
                } else {
                  regVm.message.pass = data.message;
                }

              });
        }

      }
    }

})();
