/**
 * This directive controll task data
 */
(function() {
  "use strict";

  angular
    .module("llamaLists")
    .component("task", {
      bindings: {
        data: "="
      },
      require: {
        listCtrl: '^list'
      },
      controller: taskController,
      templateUrl: 'scripts/common/components/task/task.tpl.html'
    });

    taskController.$inject = ['TaskService'];
    function taskController(TaskService) {
      var listID;
      var reloadTasks;
      var textBeforeEdit;
      var taskID = this.data._id;
      var self = this;
      this.dropdownIsOpen = false;

      //func
      this.changeColor = changeColor;
      this.closeEditMode = closeEditMode;
      this.closeDropdown = closeDropdown;
      this.editTaskText = editTaskText;
      this.openDropdown = openDropdown;
      this.setTaskCompleted = setTaskCompleted;
      this.saveEditedText = saveEditedText;
      this.removeTask = removeTask;

      this.$onInit = function() {
        listID = this.listCtrl.listID;
        reloadTasks = this.listCtrl.reloadTasks;
      }


      function changeColor(event) {
        var className = event.target.className;
        var target = angular.element(event.target);

        if (!target.hasClass("task__color--active")) {
          className = className.replace("task__color ", ""); // remove unnecessary part of class name

          TaskService.update({ list: listID, task: taskID }, { color: className }, function (response) {
            self.data.color = className;
          });
        }
      }

      function closeEditMode() {
        this.data.text = textBeforeEdit;
        this.editMode = false;
      }

      function closeDropdown() {
        this.dropdownIsOpen = false;
      }

      function editTaskText() {
        textBeforeEdit = this.data.text;
        this.editMode = true;
        this.focusOn = true;
        this.closeDropdown();
      }

      function openDropdown(event) {
        if (event.currentTarget === event.target) {
          this.dropdownIsOpen = (this.dropdownIsOpen) ? false : true;
        }
      }

      function setTaskCompleted(event) {
        if (this.editMode !== true) {
          TaskService.update({ list: listID, task: taskID }, { completed: true }, function (response) {
            self.data.completed = response.task.completed;
          });
        }
      }

      function saveEditedText() {
        if (this.data.text) {
          TaskService.update({ list: listID, task: taskID }, { text: this.data.text }, function (response) {
            self.editMode = false;
          });
        } else {
          this.closeEditMode();
        }
      }

      function removeTask() {
        TaskService.delete({ list: listID, task: taskID }, function (response) {
          reloadTasks(listID);
        });
      }
    }
})();
