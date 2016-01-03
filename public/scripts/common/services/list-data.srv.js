/**
 * This service controll all data and behavior in every lists
**/

(function() {
  "use strict";

  angular
    .module('llamaLists')
    .service('listDataService', listDataService);

    listDataService.$inject = ["$http"];
    function listDataService($http) {

      this.openBackgroundPopup = function() {
        this.isOpenedBackgroundPopup = true;
      };

      this.closeBackgroundPopup = function() {
        this.isOpenedBackgroundPopup = false;
      }

      this.getBackgroundPopup = function() {
        return this.isOpenedBackgroundPopup;
      }

      this.getAllLists = function() {
        return $http.get("/api/lists").then(function (response) {
            return response.data;
        });
      }

      this.saveNewList = function(data) {
        return $http.post('/api/lists', data).then(function (response) {
          return response.data;
        });
      }
    }
})();
