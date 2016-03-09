/**
 * This directive controll loading files
 */
(function() {
  "use strict";

  angular
    .module("llamaLists")
    .directive("fileReader", fileReaderDirective);

    fileReaderDirective.$inject = ["$parse"];
    function fileReaderDirective($parse) {
      var directive = {
        restrict: "A",
        link: linkFunc
      }

      return directive;

      function linkFunc(scope, element, attrs) {
        var fn = $parse(attrs["fileReader"]);

        element.bind("change", eventHandler);

        function eventHandler(event) {
          scope.$apply(function () {
              fn(scope, { image: event.target.files[0] });
          });
        }
      }
    }

})();
