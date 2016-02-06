/**
 * This service controll user request
 */

(function() {
  "use strict";

  angular
    .module("llamaLists")
    .factory("UserService", UserService);

    UserService.$inject = ["$resource"];
    function UserService($resource) {
      var data = $resource("/api/user/:type", { type: "@type" }, {
        update:  {
          method: "PUT"
        },
        avatar: {
          method: "PUT",
          params: {
            type: "avatar"
          }
        },
        getInterests: {
          method: "GET",
          params: {
            type: "interests"
          }
        },
        setInterests: {
          method: "PUT",
          params: {
            type: "interests"
          }
        }
      });

      return data;
    }
})();
