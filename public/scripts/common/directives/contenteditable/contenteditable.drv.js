(function() {

"use strict";

  angular
    .module("llamaLists")
    .directive("contenteditable", contenteditableDirective)

    function contenteditableDirective() {
      var directive = {
        restrict: "A",
        require: "ngModel",
        link: linkFunc
      }

      return directive;

      function linkFunc(scope, element, attrs, ngModel) {
        function read() {
          ngModel.$setViewValue(element.html());
        }

        ngModel.$render = function() {
          element.html(ngModel.$viewValue || "");
        };

        element.bind("blur keyup change", function() {
          scope.$apply(read);
        });
      }
    }

}());
