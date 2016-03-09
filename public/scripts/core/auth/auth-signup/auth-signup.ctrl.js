(function() {
  "use strict";

  angular.module("llamaLists")
    .controller("signupPageCtrl", SignupPageCtrl);

    SignupPageCtrl.$inject = ["$window", "$state", "AuthService"];
    function SignupPageCtrl($window, $state, AuthService) {
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

          AuthService.save({}, userData, function (response) {
            $window.localStorage.token = response.token;
            $window.localStorage.user = signupVm.userName;
            $state.go("main.interests");
          }, function (error) {
            delete $window.localStorage.token;
            signupVm.message = error.data.message;
          });
        }
      }

      function clearMessageError() {
        signupVm.message = null;
      }
    }

})();
