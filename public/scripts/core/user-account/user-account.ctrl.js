(function() {
  "use strict";

  angular
    .module("llamaLists")
    .controller("llamaLists.core.accountCtrl", AccountCtrl);

    AccountCtrl.$inject = ["$scope", "$http", "$state", "$window", "$rootScope"];
    function AccountCtrl($scope, $http, $state, $window, $rootScope) {
      var accountVm = this;
      accountVm.showNewList = false;

      $http
        .get("/api/account")
        .success(function (data, status, headers, config) {
          accountVm.message = data.enter;
        })
        .error(function (data, status, headers, config) {
          console.log("error");
        });

      $http
        .get("/api/lists")
        .success(function (data, status, headers, config) {
          accountVm.lists = data.lists;
        })
        .error(function (data, status, headers, config) {
          console.log("error");
        });

      accountVm.createNewList = function(validation) {
        var date = new Date().toUTCString();
        accountVm.submitted = true;

        if (validation) {
          var listsData = {
            title: accountVm.listTitle,
            date: date
          }

          $http
            .post("/api/lists", listsData)
            .success(function (data, status, headers, config) {
              accountVm.lists = data.lists;
            })
            .error(function (data, status, headers, config) {
              console.log("error");
            });
        } else {
          console.log("error")
        }
      }
    };

})();
