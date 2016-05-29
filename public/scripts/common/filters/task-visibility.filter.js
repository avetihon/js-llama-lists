(function() {
  'use script';

  angular
    .module('llamaLists')
    .filter('taskVisibility', taskVisibility);

    function taskVisibility() {
      return function(input, color, completed) {
        if (color === 'none' && completed === 'visible') {
          return input;
        } else {
          var filteredElements = input.filter(function(item) {
            // very bad triple condition, but another solution use two filters that's more baddest!
            if (completed === 'hidden') {
              if (color !== 'none') {
                return (item.completed === false && item.color === color) || (item.completed === false && item.color === 'gray');
              } else {
                return item.completed === false;
              }
            } else {
              return item.color === color || item.color === 'gray';
            }
          });

          return filteredElements;
        }
      }
    }
})();
