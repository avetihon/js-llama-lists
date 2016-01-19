(function() {
  "use strict";

  angular
    .module("llamaLists")
    .controller("llamaLists.core.navbar.user-navbar.userNavCtrl", UserNavCtrl);

    UserNavCtrl.$inject = ["$state", "$window"];
    function UserNavCtrl($state, $window) {
      var navVm = this;
      navVm.logout = logout;
      navVm.openDropdown = openDropdown;
      navVm.closeDropdown = closeDropdown;

      function openDropdown(event) {
        navVm.dropdownIsOpen = (navVm.dropdownIsOpen) ? false : true;
      }

      function closeDropdown() {
        navVm.dropdownIsOpen = false;
      }

      function logout() {
        delete $window.localStorage.token;
        $state.go("index");
      }
    };

})();
