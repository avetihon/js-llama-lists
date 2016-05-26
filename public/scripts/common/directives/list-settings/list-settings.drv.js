/**
 * This directive controll global list settings
 */

(function() {
  "use strict";

  angular
    .module("llamaLists")
    .directive("listSettings", listSettingsDirective);

    listSettingsDirective.$inject = ['UserService', 'userData'];
    function listSettingsDirective(UserService, userData) {
      var directive = {
        restrict: "E",
        replace: true,
        templateUrl: "scripts/common/directives/list-settings/list-settings.tpl.html",
        link: linkFunc
      }

      return directive;

      function linkFunc(scope, elem, attrs) {

        var currentUser = userData.getData();

        // preload data
        scope.color = currentUser.color_filter;
        scope.completed = currentUser.completed;
        scope.addTask = currentUser.add_task;

        // func
        scope.changeCompleted = changeCompleted;
        scope.chooseColorFilter = chooseColorFilter;

        function changeCompleted() {
          currentUser.completed = scope.completed;
          UserService.update({}, { user: currentUser }, function(response) {
            scope.$parent.$broadcast('taskVisibility');
          });
        }

        function chooseColorFilter(color) {
          if (color === scope.color) {
            color = 'none';
          }

          currentUser.color_filter = color;
          UserService.update({}, { user: currentUser }, function(response) {
            scope.color = color;
            scope.$parent.$broadcast('taskColorFilter', { color: color });
          });
        }

      }
    }
})();
