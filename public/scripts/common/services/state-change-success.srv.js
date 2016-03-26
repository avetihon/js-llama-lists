(function() {
  'use strict';

  angular
    .module('llamaLists')
    .factory('stateChangeSuccess', stateChangeSuccess);

    stateChangeSuccess.$inject = ['$rootScope'];
    function stateChangeSuccess($rootScope) {
        return {
          initialize: function() {
            $rootScope.$on('$stateChangeSuccess', function(event, toState){
              var stateNames = toState.name.split('.');
              document.body.id = stateNames[stateNames.length - 1] + '-page';
            });
          }
        }
    }
})();
