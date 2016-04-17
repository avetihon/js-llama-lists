/**
 * This service controll all user data (like a avatar, name, interests)
 * And also check the logged user placing on your own page
 */

(function() {
  'use strict';

  angular
    .module("llamaLists")
    .service("userData", userData);

    userData.$inject = ['$window', '$stateParams'];
    function userData($window, $stateParams) {

      this.getData = function() {
          return this.userData;
      }

      this.setData = function(user) {
        this.userData = user;
      }

      this.isOwnerPage = function() {
        if ($window.localStorage.user !== $stateParams.username) {
          return false;
        } else {
          return true;
        }
      }

      this.isOwnerList = function(listOwner) {
        if ($window.localStorage.user !== listOwner) {
          return false;
        } else {
          return true;
        }
      }
    }
})();
