/**
 * This directive controll popup and change background for lists
 */
(function() {
  "use strict";

  angular
    .module("llamaLists")
    .directive("listBackground", listBackgroundDirective);

    listBackgroundDirective.$inject = ["$rootScope", "ListsService", "backgroundDataService"];
    function listBackgroundDirective($rootScope, ListsService, backgroundDataService) {
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
            return backgroundDataService.getBackgroundPopup();
          }, function() {
            scope.editedBackgroundWindow = backgroundDataService.getBackgroundPopup();
            if(scope.editedBackgroundWindow === true) {
              currentListId = backgroundDataService.getListId();
              scope.currentBackground = backgroundDataService.getCurrentBackground();
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
          var responseData = {};

          if (!angular.element(event.target).hasClass("active-background")) {
            var image = event.target.className;
            scope.currentBackground = image;
            ListsService.update({id: currentListId}, { image: image}, function (response) {
              responseData.listId = currentListId;
              backgroundDataService.setCurrentBackground(image);
              scope.$parent.$broadcast("listChanged", responseData);
            });
          }
        }

        /**
         * When fog directive broadcast closing event -> calling this func
         */
        function closePopup() {
          backgroundDataService.closeBackgroundPopup();
        }
      }
    }
})();
