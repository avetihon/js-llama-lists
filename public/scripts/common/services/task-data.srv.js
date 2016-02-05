/**
 * This service controll all data and behavior in every task
 */

(function() {
  "use strict";

  angular
    .module("llamaLists")
    .service("taskDataService", taskDataService);

    taskDataService.$inject = ["$http", "$rootScope"];
    function taskDataService($http, $rootScope) {

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

    }
})();
