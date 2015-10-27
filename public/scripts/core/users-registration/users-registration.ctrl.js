angular.module('meanJustDoIt')
	.controller('RegistrationCtrl', function ($scope, $http) {
		$scope.message = '';
		$scope.submitData = function() {

		$scope.user = {
			username: $scope.formRegData.username,
			password: $scope.formRegData.password 
		};

		$http
		  .post('/registration', $scope.user)
		  .success(function (data, status, headers, config) {
		    //$window.sessionStorage.token = data.token;
		    console.log("all done");
		  })
		  .error(function (data, status, headers, config) {
		  	console.log("error");
		    // Erase the token if the user fails to log in
		    //delete $window.sessionStorage.token;

		    // Handle login errors here
		    //$scope.message = 'Error: Invalid user or password';
		  });
		}
	    // $http.get("/api/test")
    	// .success(function(response) {
    	// 	$scope.hi = response.b;
    	// });
	});