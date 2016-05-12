(function() {
  'use strict';

  angular
    .module('llamaLists')
    .directive('onFinishRender', onFinishRender);

    onFinishRender.$inject = ["$timeout"];
    function onFinishRender($timeout) {
      var directive = {
        restrict: 'A',
        link: linkFunc,
      }

      return directive;

      function linkFunc(scope, element, attrs) {
        if (scope.$last === true) {
          $timeout(function() {
            scope.$eval(attrs.onFinishRender);
          }, 1000);
        }
      }
    }
})();
