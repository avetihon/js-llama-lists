/**
 * This service controll all data and behavior in every lists
 */

(function() {
  "use strict";

  angular
    .module("llamaLists")
    .service("listDataService", listDataService);

    listDataService.$inject = ["$http", "$rootScope"];
    function listDataService($http, $rootScope) {

      // setter-getter for list
      this.setListId = function(listId) {
        this.listId = listId;
      };

      this.getListId = function() {
        return this.listId;
      };

      // api list
      this.getAllLists = function() {
        return $http.get("/api/lists").then(function (response) {
            return response.data;
        });
      };

      this.saveNewList = function(data) {
        return $http.post("/api/list", data).then(function (response) {
          return response.data;
        });
      };

      this.removeList = function(listId) {
        return $http.delete("/api/list/" + listId).then(function (response) {
          return response.data;
        });
      };

      // controll background for list
      this.openBackgroundPopup = function(listId) {
        this.setListId(listId);
        this.isOpenedBackgroundPopup = true;
        $rootScope.$emit("showFogOverlay");
      };

      this.closeBackgroundPopup = function() {
        this.isOpenedBackgroundPopup = false;
      };

      this.getBackgroundPopup = function() {
        return this.isOpenedBackgroundPopup;
      };

      this.setBackgroundForList = function(listId, data) {
        return $http.post("/api/list/" + listId + "/image", data).then(function (response) {
          return response.data;
        });
      };

    }
})();
