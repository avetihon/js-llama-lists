(function() {
  "use strict";

  angular
    .module("llamaLists")
    .controller("listsPageCtrl", ListsPageCtrl);

    ListsPageCtrl.$inject = ["$scope", "$rootScope", "$stateParams", "ListsService", 'UserService', 'userData', 'listsFilter'];
    function ListsPageCtrl($scope, $rootScope, $stateParams, ListsService, UserService, userData, listsFilter) {
      var listsVm = this;
      var username = $stateParams.username;
      listsVm.showNewList; // check open popup
      listsVm.newListSubmitted; // check press submit button
      listsVm.createNewList = createNewList;
      listsVm.selectSort = selectSort;
      listsVm.reloadList = reloadList;
      listsVm.isOwner = userData.isOwnerPage();

      // fog broadcast
      $scope.$on('closePopup', closePopup);

      activate();

      function activate() {
        // if we work with page of another user
        if (listsVm.isCurrentUser !== true) {
          // load his data
          UserService.get({ name: username }, function (response) {
            listsVm.user = response.user;
          });
        }

        // get all lists of user
        ListsService.get({ user: username }, function (response) {
          listsVm.lists = response.lists;
        });
      }

      function createNewList() {
        listsVm.showNewList = true;
        $rootScope.$emit("showFogOverlay");
      }

      function reloadList() {
        ListsService.get({ user: username }, function (response) {
          listsVm.lists = response.lists;
        });
      }

      function selectSort(type) {
        listsVm.filter = {
          owner: {}
        };

        if (type === 'own') {
          listsVm.filter.owner.name = 'Eugene';
          listsFilter.setIsOwnFilter(true);
        } else if (type === 'inbox') {
          listsVm.filter.owner.name = '!Eugene';
          listsFilter.setIsOwnFilter(false);
        }
      }

      function closePopup() {
        listsVm.showNewList = false;
      }
    };

})();
