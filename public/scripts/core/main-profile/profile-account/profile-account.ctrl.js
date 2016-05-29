(function() {
  'use strict';

  angular
    .module('llamaLists')
    .controller('accountPageCtrl', AccountPageCtrl);

    AccountPageCtrl.$inject = ['$window', '$rootScope', 'UserService', 'userData'];
    function AccountPageCtrl($window, $rootScope, UserService, userData) {
      var vm = this;
      vm.saveChanges = saveChanges;
      vm.changeAvatar = changeAvatar;
      vm.clearMessageError = clearMessageError;

      activate();

      function activate() {
        vm.user = userData.getData();
      }

      function saveChanges(validation) {

        if (validation) {
          vm.message = null;
          vm.messageDone = null;
          UserService.update({}, { user: vm.user }, function (response) {
            vm.messageDone = response.message;
            $rootScope.$emit('reloadNavbar');
          }, function (error) {
            vm.message = error.data.message;
          });
        }
      }

      function changeAvatar(image) {
        var reader;

        if (image.type.localeCompare('image/jpeg') !== 0 && image.type.localeCompare('image/png') !== 0) {
          console.warn('error')
        }

        reader = new FileReader();
        reader.onload = function (event) {
          UserService.avatar({}, { avatar: event.target.result }, function (response) {
            vm.user.avatar = response.avatar;
            $rootScope.$emit('reloadNavbar');
          });
        }
        reader.readAsDataURL(image);
      }

      function clearMessageError() {
        vm.message = null;
      }

    };

})();
