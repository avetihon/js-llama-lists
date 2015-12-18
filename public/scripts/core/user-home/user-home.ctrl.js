(function() {
  "use strict";

  angular
    .module("llamaLists")
    .controller("llamaLists.core.user-home.homePageCtrl", HomePageCtrl);

    HomePageCtrl.$inject = ["$scope", "$http", "$state", "$window", "$rootScope"];
    function HomePageCtrl($scope, $http, $state, $window, $rootScope) {
      var homeVm = this;
      homeVm.showNewList = false;

      $http
        .get("/api/lists")
        .success(function (data, status, headers, config) {
          homeVm.lists = data.lists;
        })
        .error(function (data, status, headers, config) {
          console.log("error");
        });

      homeVm.createNewList = function(validation) {
        var date = new Date().toUTCString();
        homeVm.submitted = true;
        if (validation) {
          var listsData = {
            title: homeVm.listTitle,
            date: date
          }

          $http
            .post("/api/lists", listsData)
            .success(function (data, status, headers, config) {
              homeVm.lists = data.lists;
              homeVm.showNewList = false; // close popup
              homeVm.listTitle = null; // clear popup input
              homeVm.newListForm.$setPristine(); // set form pristine
              homeVm.submitted = false; //
            })
            .error(function (data, status, headers, config) {
              console.log("error");
            });
        }
      }
    };

})();
