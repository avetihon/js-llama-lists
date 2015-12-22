(function() {
  "use strict";

  angular
    .module("llamaLists")
    .directive("list", listDrv);

    listDrv.$inject = ["$http"];
    function listDrv($http) {
      return {
        restrict: "E",
        scope: {
          listData:"=", //get data from one list
          allLists:"=" //get all lists in DB
        },
        replace: true,
        templateUrl: "scripts/common/directives/user-list/user-list.tpl.html",
        link: function(scope, elem, attrs) {

          /**
           * This function add new task in list.
           * If successful, it show new task collection in list
           * and clear input
          **/
          scope.addNewTask = function() {
            var listId = scope.listData["_id"],
                task = {
                  task: scope.task
                };

            $http.
              post("/api/lists/" + listId + "/task", task)
              .success(function (data, status, headers, config) {
                scope.listData.task = data.taskList;
                scope.task = null;
              })
              .error(function (data, status, headers, config) {
                console.log("error");
              });
          };


          scope.clearInput = function() {
            scope.task = null;
          }

          /**
           * This function remove list.
           * If successful, it show new list collection
          **/
          scope.removeList = function() {
            var listId = scope.listData["_id"];
            $http.
              delete("/api/lists/" + listId)
              .success(function (data, status, headers, config) {
                scope.allLists = data.lists;
              })
              .error(function (data, status, headers, config) {
                console.log("error");
              });
          }
        }
      }
    }
})();
