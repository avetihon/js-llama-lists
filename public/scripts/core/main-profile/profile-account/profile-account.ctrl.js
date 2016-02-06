(function() {
  "use strict";

  angular
    .module("llamaLists")
    .controller("accountPageCtrl", AccountPageCtrl);

    AccountPageCtrl.$inject = ["$rootScope", "UserService"];
    function AccountPageCtrl($rootScope, UserService) {
      var vm = this;
      vm.saveChanges = saveChanges;
      vm.changeAvatar = changeAvatar;
      vm.clearMessageError = clearMessageError;

      activate();

      function activate() {
        UserService.get(function (response) {
          vm.avatarImage = response.user.avatar;
          vm.name = response.user.name;
          vm.email = response.user.email;
          vm.bio = response.user.bio;
        });
      }

      function saveChanges(validation) {
        var body = {};

        if (validation) {
          body.name = vm.name;
          body.email = vm.email;
          body.bio = vm.bio;

          vm.message = null;
          vm.messageDone = null;
          UserService.update({}, body, function (response) {
            vm.messageDone = response.message;
            $rootScope.$emit("reloadNavbar");
          }, function (error) {
            vm.message = error.data.message;
          });
        }
      }

      function changeAvatar(image) {
        var reader;

        if (image.type.localeCompare("image/jpeg") !== 0 && image.type.localeCompare("image/png") !== 0) {
          console.log("error")
        }

        reader = new FileReader();
        reader.onload = function (event) {
          UserService.avatar({}, { avatar: event.target.result }, function (response) {
            vm.avatarImage = response.avatar;
            $rootScope.$emit("reloadNavbar");
          });
        }
        reader.readAsDataURL(image);
      }

      function clearMessageError() {
        vm.message = null;
      }

    };

})();
