(function() {
  "use strict";

  angular.module("llamaLists")
    .controller("llamaLists.core.user-signup.signupPageCtrl", SignupPageCtrl);

    SignupPageCtrl.$inject = ["$window", "$state", "userAuthService"];
    function SignupPageCtrl($window, $state, userAuthService) {
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
            .then(function (response) {
              $window.localStorage.token = response.token;
              $state.go("interests");
            }, function (error) {
              delete $window.localStorage.token;
              signupVm.message = error.message;
            });
        }
      }

      function clearMessageError() {
        signupVm.message = null;
      }
    }

})();
