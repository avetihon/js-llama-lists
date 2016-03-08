(function() {
  "use strict";

  angular
    .module("llamaLists")
    .controller("userNavCtrl", UserNavCtrl);

    UserNavCtrl.$inject = ["$rootScope", "$scope", "$state", "$window", "UserService"];
    function UserNavCtrl($rootScope, $scope, $state, $window, UserService) {
      var navVm = this;
      navVm.logout = logout;
      navVm.openDropdown = openDropdown;
      navVm.changeAvatar = changeAvatar;
      navVm.closeDropdown = closeDropdown;
      navVm.username = $window.localStorage.user;
      var listener = $rootScope.$on("reloadNavbar", load);

      load();

      function load() {
        UserService.get({}, function (response) {
          navVm.name = response.user.name;
          navVm.avatarImage = response.user.avatar;
        });
      }

      function openDropdown(event) {
        navVm.dropdownIsOpen = (navVm.dropdownIsOpen) ? false : true;
      }

      function closeDropdown() {
        navVm.dropdownIsOpen = false;
      }

      function changeAvatar(image) {
        var reader;

        if (image.type.localeCompare("image/jpeg") !== 0 && image.type.localeCompare("image/png") !== 0) {
          console.log("error")
        }

        reader = new FileReader();
        reader.onload = function (event) {
          UserService.avatar({}, { avatar: event.target.result }, function (response) {
            navVm.avatarImage = response.avatar;
          });
        }
        reader.readAsDataURL(image);
      }

      function logout() {
        delete $window.localStorage.token;
        $state.go("home");
      }

      $scope.$on('$destroy', listener);
    };

})();
