(function() {
  "use strict";

  angular.module("llamaLists")
    .controller("interestsPageCtrl", InterestsPageCtrl);

    InterestsPageCtrl.$inject = ["$timeout", "$window", "$state", "UserService"];
    function InterestsPageCtrl($timeout, $window, $state, UserService) {
      var vm = this;
      var i = 0;
      var colorsArray = ["red", "orange", "yellow", "green", "indigo", "violet"];
      var promiseTimeout;
      vm.interests = [];
      vm.selectedInterest = [];
      vm.chooseInterest = chooseInterest;
      vm.removeInterest = removeInterest;
      vm.saveInterests = saveInterests;
      vm.username = $window.localStorage.user; // send to ui-router
      // delay is necessary to run the animation
      UserService.getInterests(function (response) {
        $timeout(function() {
          vm.interests = response.interests;
        }, 100);
      });

      /**
       * This function set to target element some class,
       * add to array of chosen interests - new interest
       * and remove from array of colors - first color
       * which is used in the array of chosen interests,
       */
      function chooseInterest(event, index) {
        var target = angular.element(event.target);
        if (i < 6) {
          target.addClass("chosen-interest");
          vm.selectedInterest.push({ text: target.text(), color: colorsArray[0], id: index });
          colorsArray.shift();
          i++;
        }
      }

      /**
       * This function get data-id from target element
       * Removes the necessary item from the array by index
       * Find the element of interests by data and remove some class
       * and push to the array of colors - color from target element
       */
      function removeInterest(event, index) {
        var targetId = event.target.dataset.selectedId;
        vm.selectedInterest.splice(index, 1);
        angular.element(document.querySelectorAll("[data-id='" + targetId + "']")).removeClass("chosen-interest");
        colorsArray.push(event.target.dataset.color)
        i--;
      }
      // i know this code placing between fuck and shit

      function saveInterests() {
        var arrayToSend = [];

        if (vm.selectedInterest.length > 0) {
          vm.selectedInterest.forEach(function(item) {
            arrayToSend.push(item.text);
          });
          UserService.setInterests({}, { interests: arrayToSend }, function (response) {
            $state.go("main.lists");
          });
        } else {

          vm.emptyInterests = (vm.emptyInterests)
            ? false
            : true;
        }
      }
    }
})();
