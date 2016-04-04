(function() {
  "use strict";

  angular
    .module("llamaLists")
    .controller("listsPageCtrl", ListsPageCtrl);

    ListsPageCtrl.$inject = ["$scope", "$rootScope", "$stateParams", "$window", "ListsService", "tags"];
    function ListsPageCtrl($scope, $rootScope, $stateParams, $window, ListsService, tags) {
      var listsVm = this;
      var username = $stateParams.username;
      listsVm.newListPopup; // check open popup
      listsVm.newListSubmitted; // check press submit button
      listsVm.createNewList = createNewList;
      listsVm.saveNewList = saveNewList;
      listsVm.reloadList = reloadList;

      // fog broadcast
      $scope.$on('closePopup', closePopup);
      // list broadcast
      // $scope.$on('reloadLists', activate);

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

      function reloadList(callback) {
        ListsService.get({ user: username }, function (response) {
          listsVm.lists = response.lists;

          if (callback) {
            callback();
          }
        });
      }

      function saveNewList(validation) {
        listsVm.newListSubmitted = true;

        if (validation) {
          var result = tags.getTagsAndText(listsVm.newListTitle);

          var title = result.text;
          var hashTags = result.hashTags;

          ListsService.save({ title: title, tags: hashTags }, function (response) {
            reloadList(function() {
              // end work with popup
              $rootScope.$emit("hideFogOverlay");
              listsVm.newListTitle = null;
              listsVm.newListForm.$setPristine();
              listsVm.newListSubmitted = false;
            });
          });
        }
      }

      function closePopup() {
        listsVm.newListPopup = false;
      }
    };

})();
