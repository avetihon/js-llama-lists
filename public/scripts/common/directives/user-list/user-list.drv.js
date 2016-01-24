/**
 * This directive controll list data
 */
(function() {
  "use strict";

  angular
    .module("llamaLists")
    .directive("list", listDirective);

    listDirective.$inject = ["listDataService", "taskDataService"];
    function listDirective(listDataService, taskDataService) {
      var directive = {
        restrict: "E",
        replace: true,
        scope: {
          listData: "=",
          updateLists: "&"
        },
        templateUrl: "scripts/common/directives/user-list/user-list.tpl.html",
        link: linkFunc,
        controller: controllerFunc
      }

      return directive;

      function linkFunc(scope, elem, attrs) {
        var listId = scope.listData._id;
        scope.removeList = removeList;
        scope.addNewTask = addNewTask;
        scope.clearInput = clearInput;
        scope.openBackgroundPopup = openBackgroundPopup;
        scope.$on("listChanged", listChanged);

        /**
         * This function create new task, save its to DB
         * And in promise return all tasks of list
         */
        function addNewTask() {
          var task = {};
          task.title = scope.taskTitle;

          taskDataService.addNewTask(listId, task)
            .then(function (response) {
              scope.listData.tasks = response.tasks;
              scope.taskTitle = null;
            });
        }

        function removeList() {
          listDataService.removeList(listId)
            .then(function (response) {
              scope.updateLists();
          });
        }

        function openBackgroundPopup() {
          listDataService.openBackgroundPopup(listId);
        }

        function listChanged(event, data) {
          if (scope.listData._id == data.listId) {
            if (data.type === "backgroundChanged") {
              scope.listData.image = data.image;
            } else if (data.type === "taskChanged") {

            }
          }
        }

        function clearInput() {
          scope.taskTitle = null;
        }
      }
    }

    controllerFunc.$inject = ["$scope", "taskDataService"];
    function controllerFunc($scope, taskDataService) {
      this.listId = $scope.listData._id; // send data to inner directive
      this.reloadTasks = reloadTasks;

      function reloadTasks(listId) {
        taskDataService.getAllTask(listId).then(function (response) {
          $scope.listData.tasks = response.tasks;
        });
      }
    }
})();
