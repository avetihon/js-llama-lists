/**
 * This directive controll creating new list and at once add people to this list
 */
(function() {
  'use strict';

  angular
    .module('llamaLists')
    .directive('newList', newListDirective);

    newListDirective.$inject = ['$rootScope', '$window', 'UserService', 'SearchService', 'ListsService', 'userData', 'tags'];
    function newListDirective($rootScope, $window, UserService, SearchService, ListsService, userData, tags) {
      var directive = {
        restrict: 'E',
        replace: true,
        scope: {
          lists: '=',
          show: '='
        },
        templateUrl: 'scripts/common/directives/new-list/new-list.tpl.html',
        link: linkFunc
      }

      return directive;

      function linkFunc(scope, elem, attrs) {
        scope.showSearchResult = false;
        scope.members = [];
        scope.saveNewList = saveNewList;
        scope.searchPeople = searchPeople;
        scope.saveToMembers = saveToMembers;
        scope.removeFromMembers = removeFromMembers;
        var alreadyAddedUsers = [];

        scope.$watch(function() {
          return scope.show;
        }, function(newVal) {
          if (newVal === true) {
            scope.focus = true;
            alreadyAddedUsers.push(scope.currentUserData.name);
          } else {
            cleanInputs();
          }
        });

        loadCurrentUser();

        function loadCurrentUser() {
          if (!userData.getData()) {
            UserService.getCurrentUser(function (response) {
              userData.setData(response.user);
              scope.currentUserData = response.user;
            });
          } else {
            scope.currentUserData = userData.getData();
          }
        }

        function saveNewList(validation) {
          scope.newListSubmitted = true;

          if (validation) {
            var result = tags.getTagsAndText(scope.newListTitle);

            var title = result.text;
            var hashTags = result.hashTags;

            ListsService.save({ title: title, tags: hashTags, members: scope.members }, function (response) {
              scope.lists.push(response.list);
              $rootScope.$emit('hideFogOverlay');
              cleanInputs();
            });
          }
        }

        function searchPeople() {
          if (scope.searchUser) {
            SearchService.users({}, { name: scope.searchUser, usedNames: alreadyAddedUsers }, function(responce) {
              scope.users = responce.users;

              if (scope.users && scope.users.length > 0) {
                scope.showSearchResult = true;
              } else {
                scope.showSearchResult = false;
              }
            });
          } else {
            scope.showSearchResult = false;
          }
        }

        function saveToMembers(user) {
          scope.members.push(user);
          alreadyAddedUsers.push(user.name);

          // clear input
          scope.showSearchResult = false;
          scope.searchUser = null;
          scope.users = [];
        }

        function removeFromMembers(member) {
          var indexAddedUsers;

          scope.members.forEach(function(i, index) {
            if (scope.members[index].name === member.name) {
              scope.members.splice(index, 1);
            }
          })

          indexAddedUsers = alreadyAddedUsers.indexOf(member.name);

          if (indexAddedUsers > -1) {
            alreadyAddedUsers.splice(indexAddedUsers, 1);
          }
        }

        function cleanInputs() {
          scope.showSearchResult = false;
          scope.users = [];
          scope.members = [];
          scope.searchUser = null;
          scope.nameMember = null;
          scope.newListTitle = null;
          scope.newListForm.$setPristine();
          scope.newListSubmitted = false;
          alreadyAddedUsers = [];
        }
      }
    }
})();
