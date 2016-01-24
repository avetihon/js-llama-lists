/**
 * This directive controll popup and change background for lists
 */
(function() {
  "use strict";

  angular
    .module("llamaLists")
    .directive("listBackground", listBackgroundDirective);

    listBackgroundDirective.$inject = ["$rootScope","listDataService"];
    function listBackgroundDirective($rootScope, listDataService) {
      var directive = {
        restrict: "E",
        replace: true,
        scope: {},
        templateUrl: "scripts/common/directives/change-background/change-background.tpl.html",
        link: linkFunc
      }

      return directive;

      function linkFunc(scope, element, attrs) {
        var currentListId;

        scope.editedBackgroundWindow;
        scope.changeBackground = changeBackground;
        scope.closePopupButton = closePopupButton;
        scope.$on('closePopup', closePopup);

        /**
         * watch for changes in getter getBackgroundPopup()
         */
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

        /**
         * On click close button -> hide fog
         */
        function closePopupButton() {
          $rootScope.$emit("hideFogOverlay");
        }

        /**
         * Get class name of clicked element, save its to DB
         * And broadcast to right list changes (maybe it's vare bad solution)
         */
        function changeBackground(event) {
          var image = {};
          var responseData = {};

          image.imageName = event.target.className;
          listDataService.setBackgroundForList(currentListId, image).then( function (response) {

            responseData.listId = currentListId;
            responseData.image = image.imageName;
            responseData.type = "backgroundChanged";
            scope.$parent.$broadcast("listChanged", responseData);
          });
        }

        /**
         * When fog directive broadcast closing event -> calling this func
         */
        function closePopup() {
          listDataService.closeBackgroundPopup();
        }
      }
    }
})();
