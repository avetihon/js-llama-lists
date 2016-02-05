/**
 * This service controll user authorisation
**/

(function() {
  "use strict";

  angular
    .module("llamaLists")
    .service("userAuthService", userAuthService);

    userAuthService.$inject = ["$http", "$q"];
    function userAuthService($http, $q) {

      this.saveNewUser = function(data) {
        return $http.post("/signup", data)
        .then(function successCallback(response) {
          return response.data;
        }, function errorCallback(response) {
          return $q.reject(response.data);
        });
      }

      this.signinUser = function(data) {
        return $http.post("/login", data)
          .then(function successCallback(response) {
            return response.data;
          }, function errorCallback(response) {
            return $q.reject(response.data);
          });
      }
    }
})();
