/**
 * This directive setup focus to non form element
 */
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
        if (value) {
          element[0].focus();
          element[0].select();
          scope.trigger = false;
        }
      });
      }
    }

}());
