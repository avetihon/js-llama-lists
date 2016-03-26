var User    = require("../../app/models/user"); // load up the user model
var List    = require("../../app/models/list"); // load up the list model

/**
 * get all lists request
 */
exports.getLists = function(req, res) {

  var queryList = {
    $and: [
      { members: req.params.id },
      { owner: req.params.id }
    ]
  };

  User
    .findOne({ name: req.params.id })
    .exec(function(err, user) {

      var queryList = {
        $or: [
        { members: user._id },
        { owner: user._id }
      ]};

      List
        .find(queryList)
        .populate('members owner')
        .lean() // return plain js object, faster then mongo document
        .exec(function(err, lists) {
          if (err) throw err;
          console.log(lists)

          res.json({ lists: lists });
      });
    });
};

/**
 * save list request
 */
exports.addList = function(req, res) {

  // i use two regural expression because i dont know how write regexp .... in my shame
  var text = req.body.title.replace(/\B\#\w\w+\b/g, '').replace(/\s\s+/g, ' ');
  var hashTags = req.body.title.match(/\B\#\w\w+\b/g);

  var newList  = new List();
  newList.title = text;
  newList.tags = hashTags;
  newList.owner = req.user._id;

  newList.save(function(err, done) {
    if (err) return done(err);

    res.json({ success: true });
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

      list.save(function(err, done) {
        if (err) return done(err);

        res.json({ success: true });
      });
  });
}
