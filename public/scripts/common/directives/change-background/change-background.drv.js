(function() {
  "use strict";

  angular
    .module("llamaLists")
    .directive("listBackground", listBackground);

    function listBackground($rootScope) {
      return {
        restrict: "E",
        replace: true,
        scope: {},
        templateUrl: "scripts/common/directives/change-background/change-background.tpl.html",
        link: function(scope, elem, attrs) {

        },
        controller: function($scope, $rootScope, listDataService) {
          var vm = this;

          vm.editedBackgroundWindow = false;

          $scope.$watch(
            function() {
              return listDataService.getBackgroundPopup();
            }, function() {
              vm.editedBackgroundWindow = listDataService.getBackgroundPopup();
              if(vm.editedBackgroundWindow === true) {
                $rootScope.$emit("showFogOverlay");
              }
            }
          );

          $scope.$on('closePopup', function (event, data) {
            listDataService.closeBackgroundPopup();
          });
        },
        controllerAs: 'vm',
        bindToController: true
      }
    }
})();
