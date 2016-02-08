(function() {
  "use strict";

  angular
    .module("llamaLists")
    .controller("listsPageCtrl", ListsPageCtrl);

    ListsPageCtrl.$inject = ["$scope", "$rootScope", "$stateParams", "ListsService"];
    function ListsPageCtrl($scope, $rootScope, $stateParams, ListsService) {
      var listsVm = this;
      var username = $stateParams.username;
      listsVm.newListPopup; // check open popup
      listsVm.newListSubmitted; // check press submit button
      listsVm.createNewList = createNewList;
      listsVm.saveNewList = saveNewList;
      listsVm.updateList = activate;

      // fog broadcast
      $scope.$on('closePopup', closePopup);
      // list broadcast
      // $scope.$on('updateList', activate);

      activate();

      function activate() {
        ListsService.get({ user: username }, function (response) {
          listsVm.lists = response.lists;
        });
      }

      function createNewList() {
        listsVm.newListPopup = true;
        listsVm.focus = true;
        $rootScope.$emit("showFogOverlay");
      }

      function saveNewList(validation) {
        listsVm.newListSubmitted = true;

        if (validation) {

        ListsService.save({title: listsVm.newListTitle}, function (response) {
          listsVm.lists = response.lists;

          // end work with popup
          $rootScope.$emit("hideFogOverlay");
          listsVm.newListTitle = null;
          listsVm.newListForm.$setPristine();
          listsVm.newListSubmitted = false;
        });
        }
      }

      function closePopup() {
        listsVm.newListPopup = false;
      }
    };

})();
