(function() {
  "use strict";

  angular.module("llamaLists")
    .controller("llamaLists.core.user-login.loginPageCtrl", LoginPageCtrl);

  LoginPageCtrl.$inject = ["$window", "$state", "userAuthService"];
  function LoginPageCtrl($window, $state, userAuthService) {
    var loginVm = this,
        userData = {};
    loginVm.submitted;
    loginVm.submitData = submitData;
    loginVm.clearMessageError = clearMessageError;

    function submitData(validation) {
      loginVm.submitted = true;

      if (validation) {
        userData = {
          username: loginVm.username,
          password: loginVm.password
        };

        userAuthService.signinUser(userData)
          .then(function (response) {
            $window.localStorage.token = response.token;
            $state.go("home");
          }, function (error) {
            delete $window.localStorage.token;
            loginVm.message = error.message;
          });
      }
    }

    function clearMessageError() {
      loginVm.message = null;
    }
  }

})();
