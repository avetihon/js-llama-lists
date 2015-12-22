(function() {
  "use strict";

  angular
    .module("llamaLists")
    .directive("llamaClickOutside", clickOutsideDrv);

    clickOutsideDrv.$inject = ["$document"];
    function clickOutsideDrv($document) {
      return {
        restrict: "A",
        link: function(scope, elem, attrs) {
            var classNotRemove = attrs.llamaOutsideIfNot;
            scope.showDropdownProfile = false;

            scope.toggleDropdownProfile = function() {
              scope.showDropdownProfile = !scope.showDropdownProfile;
            }

            var eventHandler = function(event){
              var isClickedElementChild = elem
                  .find(event.target)
                  .length > 0;
              var isClickedElementSelf = elem[0].contains(event.target),
                  clickedElementClass = event.target.className;

              // console.log(angular.element(document.querySelector(".dropdown-menu")).find("*")); // find all children
              if(isClickedElementChild || isClickedElementSelf || clickedElementClass === classNotRemove) {
                return;
              } else {
                scope.$apply(function(){
                  scope.showDropdownProfile = false;
                });
              }
            }

            $document.on("click", eventHandler);

            scope.$on("$destroy", function() {
              $document.off("click", eventHandler);
            });
        }
      }
    }
})();
