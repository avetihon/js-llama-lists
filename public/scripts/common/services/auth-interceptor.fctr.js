(function() {
  "use strict";

  angular.module("llamaLists")
    .factory('llamaLists.common.service.authInterceptor', authInterceptor)
    .config(function ($httpProvider) { //
      $httpProvider.interceptors.push("llamaLists.common.service.authInterceptor");
    });

    authInterceptor.$inject = ["$rootScope", "$q", "$window", "$injector"];
    function authInterceptor($rootScope, $q, $window, $injector) {
      return {
        request: function (config) {
          config.headers = config.headers || {};
          if ($window.localStorage.token) {
            config.headers.Authorization = "Bearer " + $window.localStorage.token;
          }
          return config;
        },
        response: function (response) {
          return response || $q.when(response);
        },
        responseError: function (response) {
          if (response.status === 401) {
            // handle the case where the user is not authenticated
            $injector.get('$state').go("index");
          }
          return response || $q.when(response);
        }
      };
    }
})();
