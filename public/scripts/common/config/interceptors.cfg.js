(function() {
  'use strict';

  angular
    .module('llamaLists')
    .constant('configInterceptors', configInterceptors);

    function configInterceptors($httpProvider) {
      $httpProvider.interceptors.push("AuthInterceptor");
    }
})();
