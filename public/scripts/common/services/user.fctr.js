/**
 * This service controll user request
 */

(function() {
  'use strict';

  angular
    .module('llamaLists')
    .factory('UserService', UserService);

    UserService.$inject = ['$resource', '$window'];
    function UserService($resource, $window) {
      var currentUser = $window.localStorage.user;

      var data = $resource('/api/user/:name:type', { name: '@name', type: '@type' }, {
        update:  {
          method: 'PUT'
        },
        getCurrentUser: {
          method: 'GET',
          params: {
            name: currentUser
          }
        },
        avatar: {
          method: 'PUT',
          params: {
            type: 'avatar'
          }
        },
        getInterests: {
          method: 'GET',
          params: {
            type: 'interests'
          }
        },
        setInterests: {
          method: 'PUT',
          params: {
            type: 'interests'
          }
        }
      });

      return data;
    }
})();
