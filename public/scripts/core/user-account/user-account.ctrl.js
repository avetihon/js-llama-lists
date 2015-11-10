(function() {
  "use strict";

  angular
    .module("justDoIt")
    .controller("justDoIt.core.accountCtrl", AccountCtrl);

    function AccountCtrl($scope, $http, $state, $window) {
      var accountVm = this;
      accountVm.showNewList = false;

      $http
        .get("/api/account")
        .success(function (data, status, headers, config) {
          accountVm.message = data.enter;
        })
        .error(function (data, status, headers, config) {
          alert(data);
        });

      $http
        .get("/api/lists")
        .success(function (data, status, headers, config) {
          accountVm.lists = data.lists;
        })
        .error(function (data, status, headers, config) {
          console.log("error");
        });

      accountVm.logOut = function() {
        delete $window.localStorage.token;
        $state.go("registration");
      }

      accountVm.createNewList = function() {
        var date = new Date().toUTCString();
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
      }
    };

})();
