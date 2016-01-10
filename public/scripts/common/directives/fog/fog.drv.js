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
    function fogDirective($rootScope) {

      var directive = {
        restrict: "E",
        replace: true,
        scope: {},
        template: "<div id='fog' ng-show='showFogState' ng-click='hideFogOverlay()'></div>",
        link: linkFunc
      }

      return directive;

      function linkFunc(scope, element, attribute) {
        var listenerShowOverlay = $rootScope.$on("showFogOverlay", showFogOverlay);
        var listenerHideOverlay = $rootScope.$on("hideFogOverlay", hideFogOverlay);
        scope.hideFogOverlay = hideFogOverlay;

        // remove rootscope listener
        scope.$on('$destroy', listenerShowOverlay);
        scope.$on('$destroy', listenerHideOverlay);

        /*
          This function close whatever popup window
          And hide fog (or overlay)
        */
        function hideFogOverlay() {
          scope.showFogState = false;
          scope.$parent.$broadcast("closePopup"); // little hint
        }

        function showFogOverlay() {
          scope.showFogState = true;
        }
      }
    }
})();
