(function() {
  "use strict";

  angular
    .module("llamaLists")
    .directive("listBackground", listBackground);

    listBackground.$inject = ["$rootScope","listDataService"];
    function listBackground($rootScope, listDataService) {

      var directive = {
        restrict: "E",
        replace: true,
        scope: {},
        templateUrl: "scripts/common/directives/change-background/change-background.tpl.html",
        link: linkFunc
      }

      return directive;

      function linkFunc(scope, elem, attrs) {
        var currentListId,
            isChild,
            returnData = {},
            image = {};
        scope.editedBackgroundWindow;
        scope.changeBackground = changeBackground;
        scope.closePopupButton = closePopupButton;
        scope.$on('closePopup', closePopup);

        // watch for changes in getBackgroundPopup() func
        scope.$watch(
          function() {
            return listDataService.getBackgroundPopup();
          }, function() {
            scope.editedBackgroundWindow = listDataService.getBackgroundPopup();
            if(scope.editedBackgroundWindow === true) {
              currentListId = listDataService.getListId();
            }
          }
        );

        // angular.element(elem).on('click', function (event) {
        //   isChild = angular.element(event.target).parent().hasClass("list-background-wrapper");
        //   if (isChild) {
        //     image = event.target.className;
        //     listDataService.setBackgroundForList(currentListId, image).then( function (response) {
        //       console.log(response)
        //     })
        //   }

        // });

        function closePopupButton() {
          $rootScope.$emit("hideFogOverlay");
        }

        function changeBackground(event) {
          image.imageName = event.target.className;
          listDataService.setBackgroundForList(currentListId, image).then( function (response) {
            returnData = {
              listId: currentListId,
              image: image.imageName,
              type: "backgroundChanged"
            }
            scope.$parent.$broadcast("listChanged", returnData);
          });
        }

        function closePopup() {
          listDataService.closeBackgroundPopup();
        }
      }
    }
})();
