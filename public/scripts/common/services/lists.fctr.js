/**
 * This service controll lists request
 */

(function() {
  "use strict";

  angular
    .module("llamaLists")
    .factory("ListsService", ListsService);

    ListsService.$inject = ["$resource"];
    function ListsService($resource) {
      var data = $resource("/api/lists/:id", { id: "@id" }, {
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
