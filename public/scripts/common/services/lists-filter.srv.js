/**
 * This service need for hiding some element if filtering lists
**/

(function() {
  'use strict';

  angular
    .module("llamaLists")
    .service("listsFilter", listsFilter);

    function listsFilter() {

      this.isRecommendation = function(value) {
        if (typeof value !== 'undefined') {
          this.value = value;
        }
        return this.value;
      }

      this.setIsOwnFilter = function(type) {
        this.isOwnFilter = type;
      }

      this.getIsOwnFilter = function() {
        return this.isOwnFilter;
      }
    }
})();
