(function() {
  'use strict';

  angular
    .module('llamaLists')
    .factory('InterestsService', InterestsService);

    InterestsService.$inject = ['$resource'];
    function InterestsService($resource) {
      return $resource('/api/data/interests');
    }
})();
