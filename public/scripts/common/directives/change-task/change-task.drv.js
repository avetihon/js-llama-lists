(function() {
  "use strict";

  angular
    .module("llamaLists")
    .directive("changeTask", changeTaskDirective);

    changeTaskDirective.$inject = ["$rootScope", "listDataService"];
    function changeTaskDirective($rootScope, listDataService) {
      var directive = {
        restrict: "E",
        replace: true,
        scope: {},
        templateUrl: "scripts/common/directives/change-task/change-task.tpl.html",
        link: linkFunc
      }

      return directive;

      function linkFunc(scope, elem, attrs) {
        var returnData = {},
            data = {},
            listId,
            taskId,
            parentElement,
            targetElementClass;
        scope.editedTaskWindow;
        scope.removeTask = removeTask;
        scope.changeColor = changeColor;
        scope.closePopupButton = closePopupButton;
        scope.$on('closePopup', closePopup);

        /**
         * Watch for changes in getTaskPopup() func
         * If window was open, called getTask() promise
         * And get data from the required task
         */
        scope.$watch(
          function() {
            return listDataService.getTaskPopup();
          }, function() {
            scope.editedTaskWindow = listDataService.getTaskPopup();
            if(scope.editedTaskWindow === true) {
              listId = listDataService.getListId();
              taskId = listDataService.getTaskId();
              listDataService.getTask(listId, taskId).then(function (response) { // maybe vary bad code
                scope.task = response.task;
              });
            }
          }
        );

        /**
         * Close task popup
         */
        function closePopup() {
          listDataService.closeTaskPopup();
          angular.element(document.querySelectorAll(".wrapper-task-color")).removeClass("active");
        }


        function closePopupButton() {
          $rootScope.$emit("hideFogOverlay");
          angular.element(document.querySelectorAll(".wrapper-task-color")).removeClass("active");
        }

        /**
         * Remove task func
         * If promise fulfilled, broadcast to lists - listId parameter
         */
        function removeTask() {
          listDataService.removeTask(listId, taskId).then(function (response) {
            returnData = {
              listId: listId,
              type: "taskChanged"
            }
            closePopupButton();
            scope.$parent.$broadcast("listChanged", returnData);
          });
        }

        /**
         * Change color in task func
         * Send to server type changed data and themselves changed data
         * If promise fulfilled, broadcast to tasks - taskId parameter
         * and changed data
         */
        function changeColor(event) {
          parentElement = angular.element(event.target).parent(),
          targetElementClass = event.target.className;
          if (!parentElement.hasClass("active")) {

            data = {
              data: targetElementClass,
              type: "color"
            }

            angular.element(document.querySelectorAll(".wrapper-task-color")).removeClass("active"); //remove active class
            parentElement.addClass("active"); // and set active class to clicked element
            listDataService.changeTask(listId, taskId, data).then(function (response) {
              returnData = {
                taskId: taskId,
                color:  targetElementClass,
                type: "colorChanged"
              }
              scope.$parent.$broadcast("taskChanged", returnData);
            });
          }
        }
      }
    }
})();
