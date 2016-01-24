/**
 * This directive close dropdown by click on any other element
 */
(function() {
  "use strict";

  angular
    .module("llamaLists")
    .directive("clickOutside", clickOutsideDirective);

    clickOutsideDirective.$inject = ["$document", "$parse"];
    function clickOutsideDirective($document, $parse) {
      var directive = {
        restrict: "A",
        link: linkFunc
      }

      return directive;

      function linkFunc(scope, element, attr) {
        var fn = $parse(attr['clickOutside']);

        var eventHandler = function(event){

          // any child element in directive elem
          var childElement = element[0].contains(event.target);

          if (!event || !event.target) {
              return;
          }

          if (childElement) {
            return;
          }

          return scope.$apply(function () {
              return fn(scope);
          });
        }

        $document.on("click", eventHandler);

        scope.$on("$destroy", function() {
          $document.off("click", eventHandler);
        });
      }
    }
})();
