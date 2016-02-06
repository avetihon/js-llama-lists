/**
 * This service controll task request
 */

(function() {
  "use strict";

  angular
    .module("llamaLists")
    .factory("TaskService", TaskService);

    TaskService.$inject = ["$resource"];
    function TaskService($resource) {
      var data = $resource("/api/lists/:list/task/:task", { list: "@list", task: "@task" }, {
        query: {
          method: "GET",
          isArray: false
        },
        update:  {
          method: "PUT"
        }
      });

      return data;
    }
})();
