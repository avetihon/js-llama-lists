/**
 * This directive controll task data
 */
(function() {
  "use strict";

  angular
    .module("llamaLists")
    .directive("userTask", taskDirective);

    taskDirective.$inject = ["TaskService"];
    function taskDirective(TaskService) {

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
        scope.editTaskText = editTaskText;
        scope.closeEditMode = closeEditMode;
        scope.closeDropdown = closeDropdown;
        scope.openDropdown = openDropdown;
        scope.changeColor = changeColor;
        scope.removeTask = removeTask;

        scope.dropdownIsOpen = false;

        function setTaskCompleted(event) {
          if (scope.editMode !== true) {
            TaskService.update({ list: listId, task: taskId }, { completed: true }, function (response) {
              scope.task.completed = response.task.completed;
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
        function editTaskText() {
          textBeforeEdit = scope.task.text;
          scope.editMode = true;
          scope.focusOn = true;

          closeDropdown();
        }

        function saveEditedText() {
          if (scope.task.text) {
            TaskService.update({ list: listId, task: taskId }, { text: scope.task.text }, function (response) {
              scope.editMode = false;
            });
          } else {
            closeEditMode();
          }
        }

        // disable div attr content editable, remove changes
        function closeEditMode() {
          scope.task.text = textBeforeEdit;
          scope.editMode = false;
        }

        // change task color
        function changeColor(event) {
          var className = event.target.className;
          var target = angular.element(event.target);

          if (!target.hasClass("task__color--active")) {
            className = className.replace("task__color ", ""); // remove unnecessary part of class name

            TaskService.update({ list: listId, task: taskId }, { color: className }, function (response) {
              scope.task.color = className;
            });
          }
        }

        // remove task
        function removeTask() {
          TaskService.delete({ list: listId, task: taskId }, function (response) {
            listController.reloadTasks(listId);
          })
        }
      }
    }
})();
