(function() {

"use strict";

  angular
    .module("llamaLists")
    .directive("customFocus", customFocusDirective)

    function customFocusDirective() {
      var directive = {
        restrict: "A",
        scope: {
          trigger: '=customFocus'
        },
        link: linkFunc
      }

      return directive;

      function linkFunc(scope, element, attrs) {
        scope.$watch('trigger', function(value) {
        if (value === true) {
          element[0].focus();
          scope.trigger = false;
        }
      });
      }
    }

}());
