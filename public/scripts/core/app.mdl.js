(function() {
	'use strict';

	angular
	    .module('meanJustDoIt', ['ui.router'])
	    .config(config);

	function config($locationProvider, $stateProvider, $urlRouterProvider) {

		$stateProvider
			.state('login', {
		        url: "/",
		        templateUrl: 'users-auth/users-auth.tpl.html',
		        controller: 'TestCtrl'
		    })
		    .state('registration', {
		        url: "/",
		        templateUrl: 'users-registration/users-registration.tpl.html'
		    });

	    $urlRouterProvider.otherwise('/');
	    $locationProvider.html5Mode(true);
	}



	angular.module('meanJustDoIt')

	.controller('TestCtrl', function ($scope, $http) {
	    console.log('saysomething2');
	    $http.get("/api/test")
    	.success(function(response) {
    		$scope.hi = response.b;
    	});
	})

	.controller('LoginCtrl', function ($scope, $http) {
	    console.log('saysomething1');
	    $scope.hello = 'Hello world! LoginCtrl';
	    // $http.get("/")
    	// .success(function(response) {
    	// 	console.log(response)
    	// 	$scope.hello = response.a;
    	// });
	})

	.controller('MainCtrl', function ($scope, $http) {
	    console.log('shit is getting real');
	    $http.get('/api/awesomeThings').success(function(awesomeThings) {
	        $scope.awesomeThings = awesomeThings;
	    });
	});

})();