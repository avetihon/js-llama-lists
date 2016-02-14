(function() {
  "use strict";

  angular.module("llamaLists")
    .factory('AuthInterceptor', authInterceptor)
    .config(configInterceptors);

    configInterceptors.$inject = ["$httpProvider"];
    function configInterceptors($httpProvider) {
      $httpProvider.interceptors.push("AuthInterceptor");
    }

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
        responseError: function (response) {
          if (response.status === 401) {
            // handle the case where the user is not authenticated
            $injector.get('$state').go("home"); // redirect to home page
          } else if (response.status === 404) {
            $injector.get('$state').go("404");
          }
          return $q.reject(response);
        }
      };
    }
})();
