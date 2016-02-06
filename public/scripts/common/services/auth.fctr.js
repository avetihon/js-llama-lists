/**
 * This service controll user authorisation
**/

(function() {
  "use strict";

  angular
    .module("llamaLists")
    .factory("AuthService", AuthService);

    AuthService.$inject = ["$resource"];
    function AuthService($resource) {
      return $resource("/auth/:type", {
        type: "@type"
      },
      {
        save: {
          method: "POST",
          params: {
            type: "signup"
          }
        },
        login: {
          method: "POST",
          params: {
            type: "login"
          }
        }
      });
    }
})();
