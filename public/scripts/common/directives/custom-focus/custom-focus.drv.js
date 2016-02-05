/**
 * This directive setup focus to non form element
 */
(function() {

"use strict";

  angular
    .module("llamaLists")
    .directive("customFocus", customFocusDirective)

    customFocusDirective.$inject = ["$timeout"];
    function customFocusDirective($timeout) {
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
          $timeout(function() {
            element[0].focus();
            scope.trigger = false;
          });
          // element[0].focus();

        }
      });
      }
    }

}());
