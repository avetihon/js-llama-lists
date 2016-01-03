/**
  This directive controll fog(black-transparent background)
  for all popup window
**/

(function() {
  "use strict";

  angular
    .module("llamaLists")
    .directive("fog", fogDirective);

    fogDirective.$inject = ["$rootScope"];
    function fogDirective() {

      var directive = {
        restrict: "E",
        replace: true,
        scope: {},
        template: "<div id='fog' ng-show='vm.showFogState' ng-click='vm.hideFogOverlay()'></div>",
        link: linkFunc,
        controller: controllerFunc,
        controllerAs: "vm",
        bindToController: true
      }

      return directive;

      function linkFunc(scope, element, attribute, vm) {

      }
    }

  controllerFunc.$inject = ["$scope", "$rootScope"];
  function controllerFunc($scope, $rootScope) {
    var vm = this;
    var myListenerShow = $rootScope.$on("showFogOverlay", showFogOverlay);
    var myListenerHide = $rootScope.$on("hideFogOverlay", hideFogOverlay);
    vm.hideFogOverlay = hideFogOverlay;

    // implementation

    /*
      This function close whatever popup window
      And hide fog (or overlay)
    */
    function hideFogOverlay() {
      vm.showFogState = false;
      $scope.$parent.$broadcast("closePopup"); // little hint
    }

    function showFogOverlay() {
      vm.showFogState = true;
    }

    // remove rootscope listener
    $scope.$on('$destroy', myListenerShow);
    $scope.$on('$destroy', myListenerHide);

  }
})();
