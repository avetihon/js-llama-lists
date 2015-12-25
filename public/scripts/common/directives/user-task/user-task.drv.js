(function() {
  "use strict";

  angular
    .module("llamaLists")
    .directive("userTask", userTaskDrv);

    userTaskDrv.$inject = ["$http"];
    function userTaskDrv($http) {
      return {
        require: '^list',
        restrict: "E",
        scope: {
          taskData:"="
        },
        replace: true,
        templateUrl: "scripts/common/directives/user-task/user-task.tpl.html",
        link: function(scope, elem, attrs, listCtrl) {
          scope.setTaskCompleted = function() {
            var taskId = scope.taskData._id,
                listId = listCtrl.listData;

            $http.put("/api/lists/" + listId + "/task/" + taskId + "/completed")
            .success(function (data, status, headers, config) {
              scope.taskData.completed = data.taskData;
            })
            .error(function (data, status, headers, config) {
              console.log("error")
            });
          }
        }
      }
    }
})();
