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
		        controller: 'AuthenticationCtrl'
		    })
		    .state('registration', {
		        url: "/",
		        templateUrl: 'users-registration/users-registration.tpl.html',
		        controller:'RegistrationCtrl'
		    })
		    .state('account', {
		        url: "/account",
		        templateUrl: 'user-account/user-account.tpl.html',
		        controller: 'AccountCtrl',
		        controllerAs: "account"
		    });

	    $urlRouterProvider.otherwise('/');
	    $locationProvider.html5Mode(true);
	}



	// angular.module('meanJustDoIt')
	// 	.controller('TestCtrl', function ($scope, $http) {
	// 	    console.log('saysomething2');
	// 	    $http.get("/api/test")
	//     	.success(function(response) {
	//     		$scope.hi = response.b;
	//     	});
	// 	});

})();