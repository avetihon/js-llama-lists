(function() {
  "use strict";

  angular
    .module("llamaLists")
    .controller("llamaLists.core.profile-password.passwordPageCtrl", PasswordPageCtrl);

    PasswordPageCtrl.$inject = ["userDataService"];
    function PasswordPageCtrl(userDataService) {
      var vm = this;

      vm.savePassword = savePassword;

      function savePassword(validation) {
        vm.submitted = true;
        vm.errorConfirmPass = null;
        vm.message = null;
        vm.messageDone = null;
        var body = {};
        if(validation) {
          if (vm.newPass === vm.newPassConfirm) {
            body = {
              oldPass: vm.oldPass,
              newPass: vm.newPassConfirm
            }

            userDataService.saveUserPassword(body)
              .then(function (response) {
                vm.messageDone = response.message;
              }, function (error) {
                vm.message = error.message;
              });
          } else {
            vm.errorConfirmPass = true;
          }
        }
      }
    };

})();
