(function() {
  "use strict";

  angular
    .module("llamaLists")
    .controller("profilePageCtrl", ProfilePageCtrl);

    function ProfilePageCtrl() {
      /* my most empty сontroller */
      var vm = this;

      vm.currentView = document.body.id.replace(/-page/, "");
    }

})();
