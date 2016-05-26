(function() {
  'use strict';

  angular
    .module('llamaLists')
    .controller('userNavCtrl', UserNavCtrl);

    UserNavCtrl.$inject = ['$rootScope', '$scope', '$state', '$window', 'UserService', 'userData'];
    function UserNavCtrl($rootScope, $scope, $state, $window, UserService, userData) {
      var navVm = this;
      navVm.user = {};
      navVm.logout = logout;
      navVm.openDropdown = openDropdown;
      navVm.changeAvatar = changeAvatar;
      navVm.closeDropdown = closeDropdown;
      navVm.openSettingsSidebar = openSettingsSidebar;
      navVm.username = $window.localStorage.user;
      var listener = $rootScope.$on('reloadNavbar', load);

      load();

      function load() {
        navVm.user = userData.getData();
      }

      function openDropdown(event) {
        navVm.dropdownIsOpen = (navVm.dropdownIsOpen) ? false : true;
      }

      function closeDropdown() {
        navVm.dropdownIsOpen = false;
      }

      function changeAvatar(image) {
        var reader;

        if (image.type.localeCompare('image/jpeg') !== 0 && image.type.localeCompare('image/png') !== 0) {
          alert('File format not support');
        }

        reader = new FileReader();
        reader.onload = function (event) {
          UserService.avatar({}, { avatar: event.target.result }, function (response) {
            navVm.user.avatar = response.avatar;
          });
        }
        reader.readAsDataURL(image);
      }

      function logout() {
        delete $window.localStorage.token;
        delete $window.localStorage.user;
        $state.go('home');
      }

      function openSettingsSidebar() {
        navVm.showListSettings = true;
      }

      $scope.$on('$destroy', listener);
    };

})();
