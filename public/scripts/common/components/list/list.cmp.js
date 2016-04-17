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

    listController.$inject = ['$scope', '$rootScope', 'ListsService', 'TaskService', 'listsFilter', 'userData', 'tags'];
    function listController($scope, $rootScope, ListsService, TaskService, listsFilter, userData, tags) {
      //variable
      var allowSavingTask = true;
      var textBeforeEdit = '';
      var textTemp = '';
      var self = this;
      this.listID = this.data._id;
      this.isOwner = userData.isOwnerList(this.data.owner.name);

      // watcher
      $scope.$watch(function() {
        return listsFilter.getIsOwnFilter();
      }, function() {
        self.isOwnFilter = listsFilter.getIsOwnFilter();
      });

      // function
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

      function saveTextToTemp() {
        textBeforeEdit = this.data.title;
        this.data.title = this.data.title.replace(/(<([^>]+)>)/ig, '');
        textTemp = this.data.title;

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
