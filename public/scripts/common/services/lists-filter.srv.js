/**
 * This service need for hiding some element if filtering lists
**/

(function() {
  'use strict';

  angular
    .module("llamaLists")
    .service("listsFilter", listsFilter);

    function listsFilter() {

      this.setIsOwnFilter = function(type) {
        this.isOwnFilter = type;
      }

      this.getIsOwnFilter = function() {
        return this.isOwnFilter;
      }
    }
})();
