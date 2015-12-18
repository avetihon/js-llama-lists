(function() {
  "use strict";

  angular.module("llamaLists")
    .controller("llamaLists.core.user-signup.signupPageCtrl", SignupPageCtrl);

    SignupPageCtrl.$inject = ["$scope", "$http", "$state"];
    function SignupPageCtrl($scope, $http, $state) {
      var signupVm = this;
      signupVm.submitData = function(validation) {
        signupVm.submitted = true;

        if (validation) {
          signupVm.user = {
            username: signupVm.userName,
            email:    signupVm.userEmail,
            password: signupVm.userPassword
          };

          $http
            .post("/signup", signupVm.user)
              .success(function (data, status, headers, config) {
                $state.go("login");
              })
              .error(function (data, status, headers, config) {
                signupVm.message = {};
                if (data.type == 1) {
                  signupVm.message.name = data.message;
                } else if (data.type == 2) {
                  signupVm.message.email = data.message;
                } else {
                  signupVm.message.pass = data.message;
                }

              });
        }
      }
    }

})();
