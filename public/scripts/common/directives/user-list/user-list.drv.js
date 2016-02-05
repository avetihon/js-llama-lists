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
        var allowSavingTask = true; // variable for preventing multiple enter pressing
        var textBeforeEdit = scope.listData.title;
        scope.removeList = removeList;
        scope.addNewTask = addNewTask;
        scope.clearInput = clearInput;
        scope.saveEditedTitle = saveEditedTitle;
        scope.openBackgroundPopup = openBackgroundPopup;
        scope.$on("listChanged", listChanged);

        /**
         * This function create new task, save its to DB
         * And in promise return all tasks of list
         */
        function addNewTask(validation) {

          if (validation && allowSavingTask) {
            var task = {};
            task.title = scope.taskTitle;
            allowSavingTask = false;

            taskDataService.addNewTask(listId, task)
              .then(function (response) {
                scope.listData.tasks = response.tasks;
                scope.taskTitle = null;
                allowSavingTask = true;
              });
          }
        }

        function removeList() {
          listDataService.removeList(listId)
            .then(function (response) {
              scope.updateLists();
          });
        }

        function openBackgroundPopup() {
          listDataService.openBackgroundPopup(listId, scope.listData.image);
        }

        function listChanged(event, data) {
          if (scope.listData._id == data.listId) {
              scope.listData.image = listDataService.getCurrentBackground();
          }
        }

        function saveEditedTitle() {
          // replacement needed, because when contenteditable element empty,
          // browser automaticaly add br tag
          // i dont know this bug or feature
          var editedText = scope.listData.title.replace(/<br>/, "");
          var body = {};
          if (editedText) {
            body.title = editedText;
            listDataService.setNewTitle(listId, body)
              .then(function (response) {
                textBeforeEdit = editedText;
              })
          } else {
            scope.listData.title = textBeforeEdit;
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
