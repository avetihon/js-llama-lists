(function() {
  "use strict";

  angular
    .module("llamaLists")
    .controller("llamaLists.core.profile-account.accountPageCtrl", AccountPageCtrl);

    AccountPageCtrl.$inject = ["$rootScope", "userDataService"];
    function AccountPageCtrl($rootScope, userDataService) {
      var vm = this;
      vm.saveChanges = saveChanges;
      vm.changeAvatar = changeAvatar;
      vm.clearMessageError = clearMessageError;

      activate();

      function activate() {
        userDataService.getUserData()
          .then( function (response) {
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
          userDataService.saveUserData(body)
            .then(function (response) {
              vm.message = null;
              vm.messageDone = response.message;
              $rootScope.$emit("reloadNavbar");
            }, function (error) {
              vm.messageDone = null;
              vm.message = error.message;
            });
        }
      }

      function changeAvatar(image) {
        var reader;
        var body = {};

        if (image.type.localeCompare("image/jpeg") !== 0 && image.type.localeCompare("image/png") !== 0) {
          console.log("error")
        }

        reader = new FileReader();
        reader.onload = function (event) {
          body.avatar = event.target.result;
          userDataService.saveAvatarImage(body).then(function (response) {
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
