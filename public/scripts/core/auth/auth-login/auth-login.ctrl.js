(function() {
  "use strict";

  angular.module("llamaLists")
    .controller("loginPageCtrl", LoginPageCtrl);

  LoginPageCtrl.$inject = ["$window", "$state", "AuthService", 'UserService', 'userData'];
  function LoginPageCtrl($window, $state, AuthService, UserService, userData) {
    var loginVm = this;
    loginVm.submitted;
    loginVm.submitData = submitData;
    loginVm.clearMessageError = clearMessageError;

    function submitData(validation) {
      loginVm.submitted = true;

      if (validation) {
        var data = {
          username: loginVm.username,
          password: loginVm.password
        };

        AuthService.login({}, data, function (response) {
          $window.localStorage.token = response.token;
          $window.localStorage.user = loginVm.username;

          // reload user data because if user make log out and after again log in
          // angular not update user data
          UserService.get({ name: $window.localStorage.user }, function(response) {
            userData.setData(response.user);
            $state.go("main.lists", { username: loginVm.username });
          });
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
