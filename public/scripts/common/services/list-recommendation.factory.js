/**
 * This service
**/

(function() {
  'use strict';

  angular
    .module("llamaLists")
    .factory("ListRecommendationService", ListRecommendationService);

    ListRecommendationService.$inject = ['$resource'];
    function ListRecommendationService($resource) {

      var data = $resource("/api/data/recommendation");

      return data;
    }
})();
