(function() {
  'use strict';

  angular
    .module("llamaLists")
    .service("userLogged", userLogged);

    userLogged.$inject = ["$window", "$state", "$q"];
    function userLogged($window, $state, $q) {

      this.logged = function() {
        var deferred = $q.defer();
        if($window.localStorage.token) {
          deferred.reject("isAlreadyLogged");
        } else {
          deferred.resolve();
        }

        return deferred.promise;
      }
    }
})();
