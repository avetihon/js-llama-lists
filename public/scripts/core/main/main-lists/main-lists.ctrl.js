(function() {
  "use strict";

  angular
    .module("llamaLists")
    .controller("listsPageCtrl", ListsPageCtrl);

    ListsPageCtrl.$inject = ["$scope", "$rootScope", "$stateParams", "ListsService", 'UserService', 'userData', 'listsFilter', 'SearchService', 'ListRecommendationService'];
    function ListsPageCtrl($scope, $rootScope, $stateParams, ListsService, UserService, userData, listsFilter, SearchService, ListRecommendationService) {
      var listsVm = this;
      var username = $stateParams.username;
      var isRecommended;

      listsVm.showNewList; // check open popup
      listsVm.newListSubmitted; // check press submit button
      listsVm.createNewList = createNewList;
      listsVm.makeGlobalSearch = makeGlobalSearch;
      listsVm.selectSort = selectSort;
      listsVm.reloadList = reloadList;
      listsVm.isOwner = userData.isOwnerPage();

      // fog broadcast
      $scope.$on('closePopup', closePopup);

      activate();

      function activate() {
        // if we work with page of another user
        if (listsVm.isOwner !== true) {
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

      function getRecommendationLists() {
        ListRecommendationService.get(function(response) {
          listsVm.lists = response.lists;
          listsFilter.isRecommendation(true);
        });
      }


      function masonry() {
        // var elem = document.querySelector('.lists-wrapper');
        // var msnry = new Masonry( elem, {
        //   // options
        //   itemSelector: '.col-sm-4',
        //   percentPosition: true
        // });
      }

      function createNewList() {
        listsVm.showNewList = true;
        $rootScope.$emit("showFogOverlay");
      }

      function makeGlobalSearch() {
        SearchService.lists({ query: listsVm.search.title }, function(response) {
          listsVm.searchLists = response.lists;
        });
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

        if (listsFilter.isRecommendation() && type !== 'recommended') {
          activate();
          listsFilter.isRecommendation(false);
        }

        switch(type) {
          case 'all': {
            // listsVm.filter.owner.name = '';
            listsFilter.setIsOwnFilter(false);
            break;
          }
          case 'own': {
            listsVm.filter.owner.name = username;
            listsFilter.setIsOwnFilter(true);
            break;
          }
          case 'inbox': {
            listsVm.filter.owner.name = '!' + username;
            listsFilter.setIsOwnFilter(false);
            break;
          }
          case 'recommended': {
            delete listsVm.filter.owner;
            getRecommendationLists();
            listsFilter.setIsOwnFilter(false);
          }
        }
      }

      function closePopup() {
        listsVm.showNewList = false;
      }
    };

})();
