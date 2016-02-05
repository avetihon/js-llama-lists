/**
 * This service controll user data: set, update and other
**/

(function() {
  "use strict";

  angular
    .module("llamaLists")
    .service("userDataService", userDataService);

    userDataService.$inject = ["$http", "$q"];
    function userDataService($http, $q) {

      this.getUserData = function() {
        return $http.get("/api/user").then(function (response) {
          return response.data;
        });
      }

      this.saveUserData = function(data) {
        return $http.post("/api/user", data)
        .then(function successCallback(response) {
          return response.data;
        }, function errorCallback(response) {
          return $q.reject(response.data);
        });
      }

      this.saveUserPassword = function(data) {
        return $http.post("/api/user/password", data)
        .then(function successCallback(response) {
          return response.data;
        }, function errorCallback(response) {
          return $q.reject(response.data);
        });
      }

      this.saveAvatarImage = function(data) {
        return $http.post("/api/user/avatar", data).then(function (response) {
          return response.data;
        });
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
