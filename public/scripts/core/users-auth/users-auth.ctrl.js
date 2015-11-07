(function() {
  'use strict';

  angular.module('justDoIt')
    .controller('justDoIt.core.authenticationCtrl', function ($scope, $http, $window, $location, $state) {
      $scope.message = '';
      $scope.submitData = function() {
        if (typeof $scope.formLoginData !== "undefined") {
          $scope.user = {
            username: $scope.formLoginData.username,
            password: $scope.formLoginData.password
          };
        } else {
          alert("Empty inputs");
        }

        $http
          .post('/authenticate', $scope.user)
          .success(function (data, status, headers, config) {
            $window.localStorage.token = data.token;
            $scope.message = 'Welcome';
            $state.go('account');
          })
          .error(function (data, status, headers, config) {
            // Erase the token if the user fails to log in
            delete $window.localStorage.token;
            // Handle login errors here
            $scope.message = 'Error: Invalid user or password';
          });
      };

      $scope.callRestricted = function () {
        $http
          .get('/api/restricted')
          .success(function (data, status, headers, config) {
            $scope.message = $scope.message + ' ' + data.name; // Should log 'foo'
          })
          .error(function (data, status, headers, config) {
            alert(data);
          });
      };
  });

})();
