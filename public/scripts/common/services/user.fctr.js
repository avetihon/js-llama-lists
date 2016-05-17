/**
 * This service controll user request
 */

(function() {
  'use strict';

  angular
    .module('llamaLists')
    .factory('UserService', UserService);

    UserService.$inject = ['$resource'];
    function UserService($resource) {

      var data = $resource('/api/user/:name:type', { name: '@name', type: '@type' }, {
        update:  {
          method: 'PUT'
        },
        avatar: {
          method: 'PUT',
          params: {
            type: 'avatar'
          }
        }
      });

      return data;
    }
})();
