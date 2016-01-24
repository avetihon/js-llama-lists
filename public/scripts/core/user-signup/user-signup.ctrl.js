(function() {
  "use strict";

  angular.module("llamaLists")
    .controller("llamaLists.core.user-signup.signupPageCtrl", SignupPageCtrl);

    SignupPageCtrl.$inject = ["$state", "userAuthService"];
    function SignupPageCtrl($state, userAuthService) {
      var signupVm = this;

      signupVm.submitted;
      signupVm.message;
      signupVm.submitData = submitData;
      signupVm.clearMessageError = clearMessageError;

      function submitData(validation) {
        signupVm.submitted = true;

        if (validation) {
          var userData = {
            username: signupVm.userName,
            email:    signupVm.userEmail,
            password: signupVm.userPassword
          }

          userAuthService.saveNewUser(userData)
            .then(function() {
              $state.go("login");
            }, function (error) {
              signupVm.message = error.message;
            });
        }
      }

      function clearMessageError() {
        signupVm.message = null;
      }
    }

})();
