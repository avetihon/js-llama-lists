(function() {
  "use strict";

  angular
    .module("llamaLists")
    .directive("clickEnter", clickEnterDirective);

    function clickEnterDirective() {
      var directive = {
        restrict: "A",
        link: linkFunc
      }

      return directive;

      function linkFunc(scope, element, attrs) {
        element.bind("keypress", function (event) {
          if(event.which === 13) { // 13 is enter code on keyboard :)
            scope.$apply(function (){
              scope.$eval(attrs.clickEnter);
            });
          }
        });
      }
    }
})();
