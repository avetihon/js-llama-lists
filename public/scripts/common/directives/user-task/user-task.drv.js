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
            listId = listController.listId;
        scope.setTaskCompleted = setTaskCompleted;
        scope.changeData = changeData;
        scope.$on("taskChanged", changeTask);

        function setTaskCompleted(event) {
          if (event.target.className !== "task-preference") {
            listDataService.setTaskCompleted(listId, taskId)
              .then(function (response) {
                scope.task.completed = response.completed;
              });
          }
        }

        function changeData() {
          listDataService.openTaskPopup(listId, taskId);
        }

        function changeTask(event, data) {
          if (scope.task["_id"] === data.taskId) {
            if (data.type === "colorChanged") {
              scope.task.color = data.color;
            }
          }
        }
      }
    }
})();
