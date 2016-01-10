(function() {
  "use strict";

  angular
    .module("llamaLists")
    .controller("llamaLists.core.user-home.homePageCtrl", HomePageCtrl);

    HomePageCtrl.$inject = ["$scope", "$rootScope", "listDataService"];
    function HomePageCtrl($scope, $rootScope, listDataService) {
      var homeVm = this,
          listData = {};
      homeVm.newListPopup; // check open popup
      homeVm.newListSubmitted; // check press submit button
      homeVm.createNewList = createNewList;
      homeVm.saveNewList = saveNewList;

      // fog broadcast
      $scope.$on('closePopup', closePopup);
      // list broadcast
      $scope.$on('updateList', activate);

      activate();

      function activate() {
        listDataService.getAllLists()
          .then( function (response) {
            homeVm.lists = response.lists;
          });
      }

      function createNewList() {
        homeVm.newListPopup = true;
        $rootScope.$emit("showFogOverlay");
      }

      function saveNewList(validation) {
        homeVm.newListSubmitted = true;

        if (validation) {
          listData.title = homeVm.newListTitle;

          listDataService.saveNewList(listData)
            .then(function (response) {
              homeVm.lists = response.lists;

              // end work with popup
              $rootScope.$emit("hideFogOverlay");
              homeVm.newListTitle = null;
              homeVm.newListForm.$setPristine();
              homeVm.newListSubmitted = false;
            });
        }
      }

      function closePopup() {
        homeVm.newListPopup = false;
      }
    };

})();
