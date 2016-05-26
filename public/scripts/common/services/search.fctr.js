/**
 * This service controll search request
 */

(function() {
  'use strict';

  angular
    .module('llamaLists')
    .factory('SearchService', SearchService);

    SearchService.$inject = ['$resource'];
    function SearchService($resource) {
      var data = $resource('/api/search/:type', {},
      {
        lists: {
          method: 'POST',
          params: {
            type: 'lists'
          }
        },
        users: {
          method: 'POST',
          params: {
            type: 'users'
          }
        }
      });

      return data;
    }
})();
