/**
 * This directive controll list data
 */
(function() {
  "use strict";

  angular
    .module("llamaLists")
    .directive("list", listDirective);

    listDirective.$inject = ["ListsService", "TaskService", "backgroundDataService"];
    function listDirective(ListsService, TaskService, backgroundDataService) {
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
            allowSavingTask = false;

            TaskService.save({ list: listId }, { text: scope.taskText}, function (response) {
              scope.listData.tasks = response.tasks;
              scope.taskText = null;
              allowSavingTask = true;
            });
          }
        }

        function removeList() {
          ListsService.delete({id: listId}, function (response) {
            scope.updateLists();
          });
        }

        function openBackgroundPopup() {
          backgroundDataService.openBackgroundPopup(listId, scope.listData.image);
        }

        /**
         * This function find the list by id and change his background
         */
        function listChanged(event, data) {
          if (scope.listData._id == data.listId) {
              scope.listData.image = backgroundDataService.getCurrentBackground();
          }
        }

        function saveEditedTitle() {
          // replacement needed, because when contenteditable element empty,
          // browser automaticaly add br tag
          // i dont know this bug or feature
          var editedText = scope.listData.title.replace(/<br>/, "");

          if (editedText) {
            ListsService.update({ id: listId }, { title: editedText }, function (response) {
              textBeforeEdit = editedText;
            });
          } else {
            scope.listData.title = textBeforeEdit;
          }
        }

        function clearInput() {
          scope.taskText = null;
        }
      }
    }

    controllerFunc.$inject = ["$scope", "TaskService"];
    function controllerFunc($scope, TaskService) {
      this.listId = $scope.listData._id; // send data to inner directive
      this.reloadTasks = reloadTasks;

      function reloadTasks(listId) {
        TaskService.query({list: listId}, function (response) {
          $scope.listData.tasks = response.tasks;
        });

      }
    }
})();
