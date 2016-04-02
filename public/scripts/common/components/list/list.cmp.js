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

    listController.$inject = ['$scope', '$rootScope', 'ListsService', 'TaskService'];
    function listController($scope, $rootScope, ListsService, TaskService) {
      //variable
      var allowSavingTask = true;
      var tagTemp = '';
      var textBeforeEdit = this.data.title;
      var self = this;
      this.listID = this.data._id;

      // function
      this.addNewTask = addNewTask;
      this.clearInput = clearInput;
      this.closePopupAndOverlay = closePopupAndOverlay;
      this.invitePeople = invitePeople;
      this.openBackgroundPopup = openBackgroundPopup;
      this.saveEditedTitle = saveEditedTitle;
      this.saveTagToTemp = saveTagToTemp;
      this.saveEditedTags = saveEditedTags;
      this.removeList = removeList;
      this.reloadTasks = reloadTasks;
      $scope.$on('closePopup', closePopup);

      function addNewTask(validation) {

        if (validation && allowSavingTask) {
          allowSavingTask = false;

          TaskService.save({ list: this.listID }, { text: this.taskText }, function (response) {
            self.data.tasks = response.tasks;
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

      function removeList() {
        ListsService.delete({ id: this.listID }, function () {
          self.reload();
        });
      }

      function saveEditedTitle() {
        // replacement needed, because when contenteditable element empty,
        // browser automaticaly add br tag
        // and I don't know this is bug or feature
        var editedText = this.data.title.replace(/<br>/, "");

        if (editedText) {
          this.data.title = divideTextAndTags(editedText).text;
          var hashtags = divideTextAndTags(editedText).hashTags;

          // if we have are new tags
          if (hashtags.length > 0) {
            // check before concatenate two array, don't dublicating the new tags already existing values
            this.data.tags = this.data.tags.concat(hashtags.filter(function(item) {
              return self.data.tags.indexOf(item) < 0;
            }));
          }

          ListsService.update({ id: this.listID }, { list: this.data }, function (response) {
            textBeforeEdit = response.list.title;
            // self.data.title = response.list.title;
            // self.data.tags = response.list.tags;
          });
        } else {
          this.data.title = textBeforeEdit;
        }
      }

      function saveTagToTemp(tag) {
        tagTemp = tag;
      }

      function saveEditedTags(tag) {
        if (tag !== tagTemp) {
          var index = this.data.tags.indexOf(tagTemp);
          var extractedHashtags = twttr.txt.extractHashtags(tag);

          // console.log(this.data.tags.indexOf('#' + extractedHashtags[0]))
          if (extractedHashtags.length > 0) {
            this.data.tags[index] = '#' + extractedHashtags[0];
          } else {
            this.data.tags.splice(index, 1);
          }
        }

        ListsService.update({ id: this.listID }, { list: this.data }, function (response) {
          self.data.tags = null;
          self.data.tags = response.list.tags;
          console.log(response.list.tags)
        });
      }

      function reloadTasks(listID) {
        TaskService.query({ list: listID }, function (response) {
          self.data.tasks = response.tasks;
        });
      }

      function divideTextAndTags(text) {
        var hashTags = [];
        var twitterTags = twttr.txt.extractHashtags(text);

        twitterTags.forEach(function(item) {

          // twitter extracted tags without hash, therefore add this symbol for them
          if (hashTags.indexOf('#' + item) === -1) { // additional check on the tags already added
            hashTags.push('#' + item);
          }

          // sorry i don't know how write regex and use two replace instead one(
          text = text.replace('#' + item, '').replace(/\s\s+/g, ' ');
        });

        return {
          text: text,
          hashTags: hashTags
        }
      }
    }
})();
