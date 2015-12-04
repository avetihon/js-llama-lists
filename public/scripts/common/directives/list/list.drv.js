(function() {
  "use strict";

  angular
    .module("llamaLists")
    .directive("list", ListDrv);

    ListDrv.$inject = ["$http"];
    function ListDrv($http) {
      return {
        restrict: "E",
        scope: {
          listData:"="
        },
        replace: true,
        templateUrl: "scripts/common/directives/list/list.tpl.html",
        link: function(scope, elem, attrs) {

          scope.addNewToDo = function() {
            var toDoData = {
              id: scope.listData["_id"],
              task: scope.toDoTask
            };

            $http.
              post("/api/lists/toDo", toDoData)
              .success(function (data, status, headers, config) {
                scope.toDos = data.toDos;
                scope.toDoTask = null;
              })
              .error(function (data, status, headers, config) {
                console.log("error");
              });
          };

          scope.clearInput = function() {
            scope.toDoTask = null;
          }
        },
        controller: function($scope) {
          $scope.showNewToDo = false;
          $scope.toDos = $scope.listData.toDo;
          // $scope.toDos = listData.
        }
      }
    }
})();
