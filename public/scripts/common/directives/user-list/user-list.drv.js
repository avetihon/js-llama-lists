(function() {
  "use strict";

  angular
    .module("llamaLists")
    .directive("list", listDirective);

    listDirective.$inject = ["listDataService"];
    function listDirective(listDataService) {

      var directive = {
        restrict: "E",
        replace: true,
        scope: {
          listData: "="
        },
        templateUrl: "scripts/common/directives/user-list/user-list.tpl.html",
        link: linkFunc,
        controller: controllerFunc
      }

      return directive;

      function linkFunc(scope, elem, attrs) {
        var task = {},
            listId = scope.listData["_id"];
        scope.removeList = removeList;
        scope.addNewTask = addNewTask;
        scope.clearInput = clearInput;
        scope.openBackgroundPopup = openBackgroundPopup;
        scope.$on("listChanged", listChanged);

        function addNewTask() {
          task.title = scope.taskTitle;
          listDataService.addNewTask(listId, task)
            .then(function (response) {
              scope.listData.task = response.task;
              scope.taskTitle = null;
            });
        }

        function removeList() {
          listDataService.removeList(listId)
            .then(function (response) {
              scope.$emit("updateList");
          });
        }

        function openBackgroundPopup() {
          listDataService.openBackgroundPopup(listId);
        }

        function listChanged(event, data) {
          if (scope.listData["_id"] == data.listId) {
            if (data.type === "backgroundChanged") {
              scope.listData.image = data.image;
            } else if (data.type === "taskChanged") {
              listDataService.getAllTask(listId).then(function (response) {
                scope.listData.task = response.tasks;
              });
            }
          }
        }

        function clearInput() {
          scope.taskTitle = null;
        }
      }
    }

    controllerFunc.$inject = ["$scope"];
    function controllerFunc($scope) {
      this.listId = $scope.listData["_id"]; // send data to other directive
    }
})();
