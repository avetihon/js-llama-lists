(function() {
  "use strict";

  angular
    .module("llamaLists")
    .controller("passwordPageCtrl", PasswordPageCtrl);

    PasswordPageCtrl.$inject = ["UserService"];
    function PasswordPageCtrl(UserService) {
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

            UserService.save({}, body, function (response) {
              vm.messageDone = response.message;
            }, function (error) {
              vm.message = error.data.message;
            });
          } else {
            vm.errorConfirmPass = true;
          }
        }
      }
    };

})();
