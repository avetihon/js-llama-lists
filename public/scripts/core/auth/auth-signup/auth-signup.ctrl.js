(function() {
  "use strict";

  angular.module("llamaLists")
    .controller("signupPageCtrl", SignupPageCtrl);

    SignupPageCtrl.$inject = ["$window", "$state", "AuthService", 'UserService', 'userData'];
    function SignupPageCtrl($window, $state, AuthService, UserService, userData) {
      var signupVm = this;

      signupVm.submitted;
      signupVm.message;
      signupVm.submitData = submitData;
      signupVm.clearMessageError = clearMessageError;

      function submitData(validation) {
        signupVm.submitted = true;

        if (validation) {
          var data = {
            username: signupVm.userName,
            email:    signupVm.userEmail,
            password: signupVm.userPassword
          }

          AuthService.save({}, data, function (response) {
            $window.localStorage.token = response.token;
            $window.localStorage.user = signupVm.userName;


            // reload user data because if user make log out and after again log in
            // angular not update user data
            UserService.get({ name: $window.localStorage.user }, function(response) {
              userData.setData(response.user);
              $state.go("main.interests");
            });
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
