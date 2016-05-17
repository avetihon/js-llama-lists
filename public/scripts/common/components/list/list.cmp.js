/**
 * This component controll list data
 */
(function() {
  "use strict";

  angular
    .module("llamaLists")
    .component("list", {
      bindings: {
        data: "=",
        reload: "&"
      },
      controller: listController,
      templateUrl: 'scripts/common/components/list/list.tpl.html'
    });

    listController.$inject = ['$scope', '$rootScope', 'ListsService', 'TaskService', 'listsFilter', 'userData', 'UserService', 'tags'];
    function listController($scope, $rootScope, ListsService, TaskService, listsFilter, userData, UserService, tags) {
      //variable
      var allowSavingTask = true;
      var textBeforeEdit = '';
      var textTemp = '';
      var self = this;
      this.listID = this.data._id;
      this.siteUrl = document.location.href;
      this.twitterText = 'I create a new to-do list at page ' + this.siteUrl;

      // check that user on it's own page
      this.isOwnerPage = userData.isOwnerPage();

      // check that user is list owner
      this.isOwner = userData.isOwnerList(this.data.owner.name);

      // count likes
      this.likes = this.data.likes.length;

      // this watcher hide avatar on lists if user choose sorting by his own lists
      $scope.$watch(function() {
        return listsFilter.getIsOwnFilter();
      }, function() {
        self.isOwnFilter = listsFilter.getIsOwnFilter();
      });

      /**
       * On init add class to all already liked lists
       * And class to lists, that were already shared to current users
       **/
      this.$onInit = function() {
        var currentUser = userData.getCurrentUser();

        this.alreadyLiked = this.data.likes.some(function(item) {
          return item === currentUser;
        });

        if (!this.isOwnerPage) {
          this.isUserAlreadyInMembers = this.data.members.some(function(item) {
            return item.name === currentUser;
          });
        }
      }



      // function
      this.addCurrentUserToMembers = addCurrentUserToMembers;
      this.addLike = addLike;
      this.addNewTask = addNewTask;
      this.clearInput = clearInput;
      this.closePopupAndOverlay = closePopupAndOverlay;
      this.invitePeople = invitePeople;
      this.openBackgroundPopup = openBackgroundPopup;
      this.saveEditedTitle = saveEditedTitle;
      this.saveTextToTemp = saveTextToTemp;
      this.removeList = removeList;
      this.reloadTasks = reloadTasks;
      $scope.$on('closePopup', closePopup);

      function addCurrentUserToMembers() {
        var currentUser = userData.getData();

        if (!this.isUserAlreadyInMembers) {
          this.data.members.push(currentUser);

          ListsService.update({ id: this.listID }, { list: this.data }, function() {
            self.isUserAlreadyInMembers = true;
          });
        }
      }

      /**
       * This function add likes to lists
       * Like - it's a name user, who pressed the button
       * If is like already in list - remove its
       **/
      function addLike() {
        if (!this.isOwner) {
          var newListInterest;
          var currentUser = userData.getData();

          // check is user already take the like
          var isUserTakeLike = this.data.likes.some(function(item) {
            return item === currentUser.name;
          });

          if (isUserTakeLike) {
            // if yes remove his like
            this.data.likes = this.data.likes.filter(function(item) {
              return item !== currentUser.name;
            });

            this.alreadyLiked = false;

            // and remove list tags from user lists_interests array
            newListInterest = _.difference(currentUser.lists_interests, this.data.tags);
          } else {
            this.data.likes.push(currentUser.name);
            this.alreadyLiked = true;

            newListInterest = _.union(currentUser.lists_interests, this.data.tags);
          }

          // save to user updated lists interests
          currentUser.lists_interests = newListInterest;

          this.likes = this.data.likes.length;

          // send data to server
          ListsService.update({ id: this.listID }, { list: this.data });
          UserService.update({}, { user: currentUser });
        }
      }

      function addNewTask(validation) {

        if (validation && allowSavingTask) {
          allowSavingTask = false;

          TaskService.save({ list: this.listID }, { text: this.taskText }, function (response) {
            self.data.tasks.push(response.task);
            self.taskText = null;
            allowSavingTask = true;
          });
        }
      }

      function clearInput() {
        this.taskText = null;
      }

      function closePopup() {
        self.showInviteList = false;
        self.showBackground = false;
      }

      function closePopupAndOverlay() {
        this.showBackground = false;
        this.showInviteList = false;
        $rootScope.$emit("hideFogOverlay");
      }

      function invitePeople() {
        this.showInviteList = true;
        $rootScope.$emit("showFogOverlay");
      }

      function openBackgroundPopup() {
        this.showBackground = true;
        $rootScope.$emit("showFogOverlay");
      }

      /**
       * Check is this owner list who want remove
       * If yes - remove list from DB
       * Else - remove this user from list members
       **/
      function removeList() {
        if (this.isOwner) {
          ListsService.delete({ id: this.listID }, function () {
            self.reload();
          });
        } else {
          var currentUser = userData.getCurrentUser();

          var newMembersArray = this.data.members.filter(function(item) {
            return item.name !== currentUser;
          });

          this.data.members = newMembersArray;

          ListsService.update({ id: self.listID }, { list: this.data }, function (response) {
            self.reload();
          });
        }
      }

      function saveTextToTemp() {
        if (this.isOwner) {
          textBeforeEdit = this.data.title;
          this.data.title = this.data.title.replace(/(<([^>]+)>)/ig, '');
          textTemp = this.data.title;
        }

      }

      function saveEditedTitle() {
        // replacement needed, because when contenteditable element empty,
        // browser automaticaly add br tag
        // and I don't know this is bug or feature
        // var editedText = this.data.title.replace(/<br>/, "");

        if (textTemp && textTemp !== this.data.title) {
          var result = tags.getTagsAndText(this.data.title);
          this.data.title = result.text;
          this.data.tags = result.hashTags;

          ListsService.update({ id: this.listID }, { list: this.data });
        } else {
          this.data.title = textBeforeEdit;
        }
      }

      function reloadTasks(listID) {
        TaskService.query({ list: listID }, function (response) {
          self.data.tasks = response.tasks;
        });
      }
    }
})();
