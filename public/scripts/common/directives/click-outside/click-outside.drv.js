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

      function linkFunc(scope, elem, attr) {
        var fn = $parse(attr['clickOutside']),
            topElement, // directive elem
            childElement; // any child element in directive elem

        var eventHandler = function(event){

          topElement = elem[0] === event.target;
          childElement = elem[0].contains(event.target);

          if (!event || !event.target) {
              return;
          }

          if (childElement) {
            return;
          }

          // console.log(angular.element(elem[0]) == angular.element(event.target))
          // console.log(angular.element(elem[0].querySelector("." + event.target.className)).length);

          // isChild = elem[0].querySelector("." + event.target.className);

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
