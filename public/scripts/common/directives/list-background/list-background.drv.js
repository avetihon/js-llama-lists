/**
 * This directive controll popup and change background for lists
 */
(function() {
  "use strict";

  angular
    .module("llamaLists")
    .directive("listBackground", listBackgroundDirective);

    listBackgroundDirective.$inject = ['ListsService']
    function listBackgroundDirective(ListsService) {
      var directive = {
        restrict: "A",
        require: '^list',
        replace: true,
        scope: {},
        link: linkFunc
      }

      return directive;

      function linkFunc(scope, element, attrs, listCtrl) {
        if (attrs.class === listCtrl.data.image) {
          element.addClass('active-background');
        }

        element.bind('click', clickHandler);

        function clickHandler() {
          if (!element.hasClass('active-background')) {
            listCtrl.data.image = attrs.class;
            element.parent().children().removeClass('active-background'); // baaaaaaaadd code

            ListsService.update({ id: listCtrl.listID }, { list: listCtrl.data }, function (response) {
              element.addClass('active-background');
            });
          }
        }
      }
    }
})();
