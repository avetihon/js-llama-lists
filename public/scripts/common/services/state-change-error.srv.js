(function() {
  'use strict';

  angular
    .module('llamaLists')
    .factory('stateChangeError', stateChangeError);

    stateChangeError.$inject = ['$rootScope', '$state', '$window'];
    function stateChangeError($rootScope, $state, $window) {
      return {
        initialize: function() {
          $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
            if (error === 'isAlreadyLogged') {
              $state.go('main.lists', { username: $window.localStorage.user });
            }
          });
        }
      }
    }
})();
