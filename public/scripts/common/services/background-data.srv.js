/**
 * This service controll all data and behavior in every lists
 */

(function() {
  "use strict";

  angular
    .module("llamaLists")
    .service("backgroundDataService", backgroundDataService);

    backgroundDataService.$inject = ["$rootScope"];
    function backgroundDataService($rootScope) {

      // setter-getter for list
      this.setListId = function(listId) {
        this.listId = listId;
      };

      this.getListId = function() {
        return this.listId;
      };

      // controll background for list
      this.getBackgroundPopup = function() {
        return this.isOpenedBackgroundPopup;
      };

      this.openBackgroundPopup = function(listId, image) {
        this.setListId(listId);
        this.setCurrentBackground(image);
        this.isOpenedBackgroundPopup = true;
        $rootScope.$emit("showFogOverlay");
      };

      this.closeBackgroundPopup = function() {
        this.isOpenedBackgroundPopup = false;
      };

      this.setCurrentBackground = function(image) {
        this.image = image;
      }

      this.getCurrentBackground = function() {
        return this.image;
      }

    }
})();
