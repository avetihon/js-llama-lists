/**
 * This directive controll invite new people to list
 */
(function() {
  "use strict";

  angular
    .module("llamaLists")
    .directive("listInvite", listInviteDirective);

    listInviteDirective.$inject = ['SearchService', 'ListsService'];
    function listInviteDirective(SearchService, ListsService) {
      var directive = {
        restrict: "E",
        require: '^list',
        replace: true,
        templateUrl: "scripts/common/directives/list-invite/list-invite.tpl.html",
        link: linkFunc
      }

      return directive;

      function linkFunc(scope, elem, attrs, listCtrl) {
        var alreadyAddedUsers = [];
        scope.owner = listCtrl.data.owner;
        scope.stash = [];
        scope.searchPeople = searchPeople;
        scope.saveToStash = saveToStash;
        scope.removeFromStash = removeFromStash;
        scope.saveToMembers = saveToMembers;

        scope.$watch(function() {
          return listCtrl.showInviteList;
        }, function(newVal) {
          if (newVal === true) {
            loadData();
          } else {
            scope.stash = [];
          }
        });

        function loadData() {
          listCtrl.data.members.forEach(function(i) {
            i.interests = i.interests.slice(0, 3);
            scope.stash.push(i);
            alreadyAddedUsers.push(i.name);
          });
          console.log(listCtrl.data.members)

          alreadyAddedUsers.push(listCtrl.data.owner.name);
        }

        function searchPeople() {
          if (scope.members) {
            SearchService.users({}, { name: scope.members, usedNames: alreadyAddedUsers }, function(responce) {
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

        function saveToStash(user) {
          scope.stash.push(user);
          alreadyAddedUsers.push(user.name);

          // clear input
          scope.showSearchResult = false;
          scope.members = null;
          scope.users = null;
        }

        function removeFromStash(member) {
          var indexAddedUsers;

          scope.stash.forEach(function(i, index) {
            if (scope.stash[index].name === member.name) {
              scope.stash.splice(index, 1);
            }
          })

          indexAddedUsers = alreadyAddedUsers.indexOf(member.name);

          if (indexAddedUsers > -1) {
            alreadyAddedUsers.splice(indexAddedUsers, 1);
          }
        }

        function saveToMembers() {
          var list = listCtrl.data;
          list.members = scope.stash;

          ListsService.update({ id: listCtrl.listID }, { list: list }, function (response) {
            listCtrl.showInviteList = true;
            listCtrl.closePopupAndOverlay();
          });
        }
      }
    }
})();
