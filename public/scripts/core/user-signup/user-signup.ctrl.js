(function() {
  "use strict";

  angular.module("llamaLists")
    .controller("llamaLists.core.user-signup.signupPageCtrl", SignupPageCtrl);

    SignupPageCtrl.$inject = ["$state", "userAuthService"];
    function SignupPageCtrl($state, userAuthService) {
      var signupVm = this,
          userData = {};
      signupVm.submitted;
      signupVm.message;
      signupVm.submitData = submitData;
      signupVm.clearMessageError = clearMessageError;

      function submitData(validation) {
        signupVm.submitted = true;

        if (validation) {
          userData = {
            username: signupVm.userName,
            email:    signupVm.userEmail,
            password: signupVm.userPassword
          }

          userAuthService.saveNewUser(userData)
            .then(function() {
              $state.go("login");
            }, function (error) {

              signupVm.message = {};

              switch(error.type) {
                case 1:
                  signupVm.message.name = error.message;
                  break;
                case 2:
                  signupVm.message.email = error.message;
                  break;
                case 3:
                  signupVm.message.pass = error.message;
                  break;
                case 4:
                  signupVm.message.name = error.message;
                  signupVm.message.email = error.message;
                  signupVm.message.pass = error.message;
                  break;
              }
            });
        }
      }

      function clearMessageError() {
        signupVm.message = null;
      }
    }

})();
