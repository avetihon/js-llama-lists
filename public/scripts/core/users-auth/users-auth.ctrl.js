angular.module('meanJustDoIt')
    .controller('AuthenticationCtrl', function ($scope, $http, $window) {
        $scope.message = '';
        $scope.submitData = function() {
            $scope.user = {
                username: $scope.formLoginData.username,
                password: $scope.formLoginData.password 
            };

            $http
                .post('/authenticate', $scope.user)
                .success(function (data, status, headers, config) {
                    console.log(status);
                    $window.sessionStorage.token = data.token;
                    $scope.message = 'Welcome';
                })
                .error(function (data, status, headers, config) {
                    // Erase the token if the user fails to log in
                    delete $window.sessionStorage.token;
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