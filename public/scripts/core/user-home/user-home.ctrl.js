(function() {
  "use strict";

  angular
    .module("llamaLists")
    .controller("llamaLists.core.user-home.homePageCtrl", HomePageCtrl);

    HomePageCtrl.$inject = ["$scope", "$http", "$state", "$window", "$rootScope", "listDataPrepService", "listDataService"];
    function HomePageCtrl($scope, $http, $state, $window, $rootScope, listDataPrepService, listDataService) {
      var homeVm = this,
          listData = {};
      homeVm.newListPopup; // check open popup
      homeVm.newListSubmitted; // check press submit button
      homeVm.createNewList = createNewList;
      homeVm.saveNewList = saveNewList;

      // fog broadcast
      $scope.$on('closePopup', closePopup);

      // route resolve promises
      homeVm.lists = listDataPrepService.lists;


      function createNewList() {
        homeVm.newListPopup = true;
        $rootScope.$emit("showFogOverlay");
      }

      function saveNewList(validation) {
        homeVm.newListSubmitted = true;

        if (validation) {
          listData.title = homeVm.newListTitle;

          listDataService.
            saveNewList(listData)
            .then(function (response) {
              homeVm.lists = response.lists;

              // end work with popup
              $rootScope.$emit("hideFogOverlay");
              homeVm.newListTitle = null;
              homeVm.newListForm.$setPristine();
              homeVm.newListSubmitted = false;
            })
        }
      }

      function closePopup() {
        homeVm.newListPopup = false;
      }
    };

})();
