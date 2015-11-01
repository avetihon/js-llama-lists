(function() {
    'use strict';
    
    angular
        .module('meanJustDoIt')
        .controller('AccountCtrl', AccountCtrl);

    function AccountCtrl($scope, $http, $state) {
        console.log("ddddddddd")
        $http
            .get('/api/account')
            .success(function (data, status, headers, config) {
                $scope.message = data.enter; // Should log 'foo'
            })
            .error(function (data, status, headers, config) {
                alert(data);
            });
        };
})();