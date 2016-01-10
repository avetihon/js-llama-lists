/**
 * This service controll all data and behavior in every lists and task
**/

/* I know what need make refactoring this class, but I don't know how  */

(function() {
  "use strict";

  angular
    .module("llamaLists")
    .service("listDataService", listDataService);

    listDataService.$inject = ["$http", "$rootScope"];
    function listDataService($http, $rootScope) {
      var listId;

      // setter-getter list

      this.setListId = function(listId) {
        this.listId = listId;
      };

      this.getListId = function() {
        return this.listId;
      };

      // api list
      this.getAllLists = function() {
        return $http.get("/api/lists").then(function (response) {
            return response.data;
        });
      };

      this.saveNewList = function(data) {
        return $http.post("/api/list", data).then(function (response) {
          return response.data;
        });
      };

      this.removeList = function(listId) {
        return $http.delete("/api/list/" + listId).then(function (response) {
          return response.data;
        });
      };

      // controll background for list
      this.openBackgroundPopup = function(listId) {
        this.setListId(listId);
        this.isOpenedBackgroundPopup = true;
        $rootScope.$emit("showFogOverlay");
      };

      this.closeBackgroundPopup = function() {
        this.isOpenedBackgroundPopup = false;
      };

      this.getBackgroundPopup = function() {
        return this.isOpenedBackgroundPopup;
      };

      this.setBackgroundForList = function(listId, data) {
        return $http.post("/api/list/" + listId + "/image", data).then(function (response) {
          return response.data;
        });
      };

      // setter-getter for task id
      this.setTaskId = function(taskId) {
        this.taskId = taskId;
      };

      this.getTaskId = function() {
        return this.taskId;
      };

      // api task
      this.addNewTask = function(listId, data) {
        return $http.post("/api/list/" + listId + "/task", data).then(function (response) {
          return response.data;
        });
      };

      this.getAllTask = function(listId) {
        return $http.get("/api/list/" + listId + "/task").then(function (response) {
          return response.data;
        });
      };

      this.getTask = function(listId, taskId) {
        return $http.get("/api/list/" + listId + "/task/" + taskId).then(function (response) {
          return response.data;
        });
      };

      this.removeTask = function(listId, taskId) {
        return $http.delete("/api/list/" + listId + "/task/" + taskId).then(function (response) {
          return response.data;
        });
      };

      this.changeTask = function(listId, taskId, data) {
        return $http.put("/api/list/" + listId + "/task/" + taskId, data).then(function (response) {
          return response.data;
        });
      };

      this.setTaskCompleted = function(listId, taskId) {
        return $http.put("/api/list/" + listId + "/task/" + taskId + "/completed").then(function (response) {
          return response.data;
        });
      };

      // controll change data in task
      this.openTaskPopup = function(listId, taskId) {
        this.setListId(listId);
        this.setTaskId(taskId);
        this.isOpenedTaskPopup = true;
        $rootScope.$emit("showFogOverlay");
      }

      this.closeTaskPopup = function() {
        this.isOpenedTaskPopup = false;
      }

      this.getTaskPopup = function() {
        return this.isOpenedTaskPopup;
      }

    }
})();
