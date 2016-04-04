(function() {
  'use strict';

  angular
    .module("llamaLists")
    .service("tags", tags);

    function tags() {

      this.getTagsAndText = function(text) {
        var hashTags = [];
        var twitterTags = twttr.txt.extractHashtags(text);

        twitterTags.forEach(function(item) {

          // twitter extracted tags without hash, therefore add this symbol for them
          if (hashTags.indexOf(item) === -1) { // additional check on the tags already added
            hashTags.push(item);
          }

          if (text.indexOf('<span>#' + item + '</span>') === -1) {
            text = text.replace(new RegExp('#' + item, 'g'), '<span>#' + item + '</span>');
          }

          // text = text.replace(/(^|\s)#ama(\s|$)/, '<span>#' + item + '</span>'); // maybe work replace word
          // text = text.replace('#' + item, '<span>#' + item + '</span>').replace(/\s\s+/g, ' '); // replace spaces
        });

        return {
          text: text,
          hashTags: hashTags
        }
      }
    }
})();
