/**
 * This directive controll task data
 */
(function() {
  "use strict";

  angular
    .module("llamaLists")
    .directive("userTask", taskDirective);

    taskDirective.$inject = ["taskDataService"];
    function taskDirective(taskDataService) {

      var directive = {
        require: "^list",
        restrict: "E",
        scope: {
          task: "="
        },
        replace: true,
        templateUrl: "scripts/common/directives/user-task/user-task.tpl.html",
        link: linkFunc
      }

      return directive;

      function linkFunc(scope, element, attribute, listController) {
        var taskId = scope.task["_id"];
        var listId = listController.listId;
        var textBeforeEdit;

        scope.setTaskCompleted = setTaskCompleted;
        scope.saveEditedText = saveEditedText;
        scope.editTaskTitle = editTaskTitle;
        scope.closeEditMode = closeEditMode;
        scope.closeDropdown = closeDropdown;
        scope.openDropdown = openDropdown;
        scope.changeColor = changeColor;
        scope.removeTask = removeTask;

        scope.dropdownIsOpen = false;
        // scope.$on("taskChanged", changeTask);

        function setTaskCompleted(event) {
          if (scope.editMode !== true) {
            taskDataService.setTaskCompleted(listId, taskId)
              .then(function (response) {
                scope.task.completed = response.completed;
              });
          }
        }

        /**
         * This function open dropdown by clicking on editing task
         */
        function openDropdown(event) {
          if (event.currentTarget === event.target) {
            scope.dropdownIsOpen = (scope.dropdownIsOpen) ? false : true;
          }
        }

        function closeDropdown() {
          scope.dropdownIsOpen = false;
        }

        // activate div attr content editable
        function editTaskTitle() {
          textBeforeEdit = scope.task.title;
          scope.editMode = true;
          scope.focusOn = true;

          closeDropdown();
        }

        function saveEditedText() {
          var task = {
            data: scope.task.title,
            type: "title"
          }

          taskDataService.changeTask(listId, taskId, task).then(function (response) {
            scope.editMode = false;
          });
        }

        // disable div attr content editable, remove changes
        function closeEditMode() {
          scope.task.title = textBeforeEdit;
          scope.editMode = false;
        }

        // change task color
        function changeColor(event) {
          var className = event.target.className;
          var target = angular.element(event.target);
          var task = {};
          if (!target.hasClass("task__color--active")) {
            className = className.replace("task__color ", ""); // remove unnecessary part of class name

            task.data = className; // make body request
            task.type = "color";

            taskDataService.changeTask(listId, taskId, task).then(function (response) {
              scope.task.color = className;
            });
          }
        }

        // remove task
        function removeTask() {
          taskDataService.removeTask(listId, taskId).then(function (response) {
            listController.reloadTasks(listId);
          });
        }
      }
    }
})();
