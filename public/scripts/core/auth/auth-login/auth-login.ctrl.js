(function() {
  "use strict";

  angular.module("llamaLists")
    .controller("loginPageCtrl", LoginPageCtrl);

  LoginPageCtrl.$inject = ["$window", "$state", "AuthService"];
  function LoginPageCtrl($window, $state, AuthService) {
    var loginVm = this;
    loginVm.submitted;
    loginVm.submitData = submitData;
    loginVm.clearMessageError = clearMessageError;

    function submitData(validation) {
      loginVm.submitted = true;

      if (validation) {
        var userData = {
          username: loginVm.username,
          password: loginVm.password
        };

        AuthService.login({}, userData, function (response) {
          $window.localStorage.token = response.token;
          $window.localStorage.user = loginVm.username;
          $state.go("main.lists", { username: loginVm.username });
        }, function (error) {
          delete $window.localStorage.token;
          loginVm.message = error.data.message;
        });
      }
    }

    function clearMessageError() {
      loginVm.message = null;
    }
  }

})();
