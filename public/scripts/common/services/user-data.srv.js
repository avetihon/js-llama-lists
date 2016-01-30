/**
 * This service controll user data: set, update and other
**/

(function() {
  "use strict";

  angular
    .module("llamaLists")
    .service("userDataService", userDataService);

    userDataService.$inject = ["$http"];
    function userDataService($http) {

      this.getUserData = function(data) {
        return $http.get("/api/user").then(function (response) {
          return response.data;
        })
      }

      this.saveAvatarImage = function(data) {
        return $http.post("/api/user/avatar", data).then(function (response) {
          return response.data;
        })
      }

      this.getInterestsList = function() {
        return $http.get("/api/user/interests").then(function (response) {
          return response.data;
        });
      }

      this.saveInterests = function(data) {
        return $http.post("/api/user/interests", data).then(function (response) {
          return response.data;
        });
      }
    }
})();
