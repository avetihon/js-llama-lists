var User    = require("../../app/models/user"); // load up the user model
var List    = require("../../app/models/list"); // load up the list model
var twitter = require('twitter-text');

/**
 * get all lists request
 */
exports.getLists = function(req, res) {

  // var queryList = {
  //   $and: [
  //     { members: req.params.id },
  //     { owner: req.params.id }
  // ]};

  User
    .findOne({ name: req.params.id })
    .exec(function(err, user) {

      if (!user) {
        res.sendStatus(404);
      } else {
        var queryList = {
          $or: [
            { members: user._id },
            { owner: user._id }
        ]};



        List
          .find(queryList)
          .populate('members owner', '-password')
          .lean() // return plain js object, faster then mongo document
          .exec(function(err, lists) {
            if (err) throw err;

            res.status(200).json({ lists: lists });
        });
      }
    });
};

/**
 * save list request
 */
exports.addList = function(req, res) {

  var newList  = new List();
  newList.title = req.body.title;
  newList.tags = req.body.tags;
  newList.members = req.body.members;
  newList.owner = req.user._id;

  newList.save(function(err, done) {
    if (err) return done(err);

    done.populate('owner members', function(err) {
     res.status(200).json({ success: true, list: done });
    });
  });
};

/**
 * remove list request
 */
exports.removeList = function(req, res) {
  var listId = req.params.id;

  List
    .findById(listId)
    .exec(function(err, list) {
      if (err) throw err;

      list.remove();

      list.save(function (err, done) {
        if (err) return done(err);

        res.json({ success: true });
      });
  });
};

/**
 * put changes in list
 */
exports.updateList = function(req, res) {
  var listId = req.params.id;
  var bodyList = req.body.list;

  List
    .findById(listId)
    .exec(function(err, list) {
      if (err) throw err;

      list.image = bodyList.image;
      list.title = bodyList.title;
      list.members = bodyList.members;
      list.tags = bodyList.tags;
      list.likes = bodyList.likes;

      // // if we have are new tags
      // if (divideTextAndTags(bodyList.title).hashTags) {
      //   // check before concatenate two array, don't dublicating the new tags already existing values
      //   list.tags = list.tags.concat(divideTextAndTags(bodyList.title).hashTags.filter(function(item) {
      //     return list.tags.indexOf(item) < 0;
      //   }));
      // }

      list.save(function(err, done) {
        if (err) return done(err);

        res.json({ list: done });
      });
  });
}


exports.recomendationLists = function(req, res) {

}

