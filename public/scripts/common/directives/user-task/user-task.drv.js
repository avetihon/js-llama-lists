(function() {
  "use strict";

  angular
    .module("llamaLists")
    .directive("userTask", taskDirective);

    taskDirective.$inject = ["listDataService"];
    function taskDirective(listDataService) {

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
        var taskId = scope.task["_id"],
            listId = listController.listId,
            className,
            body = {},
            element,
            target,
            textBeforeEdit;
        scope.setTaskCompleted = setTaskCompleted;
        scope.saveEditedText = saveEditedText;
        scope.editTaskTitle = editTaskTitle;
        scope.closeEditMode = closeEditMode;
        scope.changeColor = changeColor;
        scope.removeTask = removeTask;
        scope.editTask = editTask;

        scope.dropdownIsOpen = false;
        // scope.$on("taskChanged", changeTask);

        // set task complete
        function setTaskCompleted(event) {
          if ((event.target.className !== "task-preference") && (scope.editMode !== true)) {
            listDataService.setTaskCompleted(listId, taskId)
              .then(function (response) {
                scope.task.completed = response.completed;
              });
          }
        }

        function editTask() {
          scope.dropdownIsOpen = (scope.dropdownIsOpen === true) ? false : true;
        }

        // activate div attr content editable
        function editTaskTitle() {
          textBeforeEdit = scope.task.title;
          scope.editMode = true;
          scope.focusOn = true;
          scope.dropdownIsOpen = false;
        }

        function saveEditedText(event) {
          event.stopPropagation();
          body.data = scope.task.title; // making body request
          body.type = "title";

          listDataService.changeTask(listId, taskId, body).then(function (response) {
            scope.editMode = false;
          });
        }

        // disable div attr content editable, remove changes
        function closeEditMode(event) {
          event.stopPropagation();
          scope.task.title = textBeforeEdit;
          scope.editMode = false;
        }

        // change task color
        function changeColor(event) {
          className = event.target.className;
          target = angular.element(event.target);
          if (!target.hasClass("task__color--active")) {
            className = className.replace("task__color ", ""); // remove unnecessary part of class name

            body.data = className; // making body request
            body.type = "color";

            listDataService.changeTask(listId, taskId, body).then(function (response) {
              scope.task.color = className;
            });
          }
        }

        // remove task
        function removeTask() {
          listDataService.removeTask(listId, taskId).then(function (response) {
            listController.reloadTasks(listId);
          });
        }
      }
    }
})();
