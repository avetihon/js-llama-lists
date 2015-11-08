(function() {
  'use strict';

  angular.module('justDoIt')
    .factory('justDoIt.core.authInterceptor', function ($rootScope, $q, $window) {
      return {
        request: function (config) {
          config.headers = config.headers || {};
          if ($window.localStorage.token) {
            config.headers.Authorization = 'Bearer ' + $window.localStorage.token;
          }
          return config;
        },
        response: function (response) {
          if (response.status === 401) {
            // handle the case where the user is not authenticated
          }
          return response || $q.when(response);
        }
      };
    })
    .config(function ($httpProvider) {
      $httpProvider.interceptors.push('justDoIt.core.authInterceptor');
    });

})();
