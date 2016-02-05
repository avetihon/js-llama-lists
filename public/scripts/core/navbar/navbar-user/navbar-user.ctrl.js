(function() {
  "use strict";

  angular
    .module("llamaLists")
    .controller("llamaLists.core.navbar.navbar-user.userNavCtrl", UserNavCtrl);

    UserNavCtrl.$inject = ["$rootScope", "$scope", "$state", "$window", "userDataService"];
    function UserNavCtrl($rootScope, $scope, $state, $window, userDataService) {
      var navVm = this;
      navVm.logout = logout;
      navVm.openDropdown = openDropdown;
      navVm.changeAvatar = changeAvatar;
      navVm.closeDropdown = closeDropdown;
      var listener = $rootScope.$on("reloadNavbar", load);

      load();

      function load() {
        userDataService.getUserData().then(function (response) {
          console.log(response.user.name)
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
        var body = {};

        if (image.type.localeCompare("image/jpeg") !== 0 && image.type.localeCompare("image/png") !== 0) {
          console.log("error")
        }

        reader = new FileReader();
        reader.onload = function (event) {
          body.avatar = event.target.result;
          userDataService.saveAvatarImage(body).then(function (response) {
            navVm.avatarImage = response.avatar;
          });

        }
        reader.readAsDataURL(image);
      }

      function logout() {
        delete $window.localStorage.token;
        $state.go("index");
      }

      $scope.$on('$destroy', listener);
    };

})();
