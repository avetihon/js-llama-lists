(function() {
  'use strict';

  angular.module('justDoIt')
    .controller('justDoIt.core.registrationCtrl', function ($scope, $http, $state) {

      $scope.message = '';
      $scope.submitData = function() {

        $scope.user = {
          username: $scope.formRegData.username,
          password: $scope.formRegData.password
        };

        $http
          .post('/registration', $scope.user)
            .success(function (data, status, headers, config) {
              $state.go('login');
            })
            .error(function (data, status, headers, config) {
              // error
            });
      }
    });

})();
