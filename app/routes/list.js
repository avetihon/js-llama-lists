var User    = require("../../app/models/user"); // load up the user model

/**
 * lists request
 */
exports.getlists = function(req, res) {
  var queryName = { name: req.user.name };
  User.findOne(queryName, function(err, user) {
    if (err) throw err;

    if (user) {
      res.json({ lists: user.list });
    }
  });
};

/**
 * save list request
 */
exports.addList = function(req, res) {
  var queryName = { name: req.user.name };

  User.findOne(queryName, function(err, user) {
    if (err) throw err;

    user.list.push({
      title: req.body.title,
      date: req.body.date
    });

    user.save(function(err, done) {
      if (err) return done(err);
      // var lengthLists = (done.list).length;

      // res.json({ lastListData: done.list[lengthLists - 1] });
      res.json({ lists: done.list });
    });
  });
};

/**
 * remove list request
 */
exports.removeList = function(req, res) {
  var listId    = req.params.id,
      queryName = { name: req.user.name };

  User.findOne(queryName, function(err, user) {
    if (err) throw err;

    user.list.id(listId).remove();

    user.save(function (err, done) {
      if (err) return done(err);
      res.json({ lists: done.list }); // return new array of list
    });
  });
};

/**
 * set new background for list request
 */
exports.setNewBackground = function(req, res) {
  var listId    = req.params.id,
      image     = req.body.imageName,
      queryName = { name: req.user.name };

  User.findOne(queryName, function(err, user) {
    if (err) throw err;

    var list = user.list.id(listId);
    list.image = image;

    user.save(function(err, done) {
      if (err) return done(err);

      res.json({success: true});
    });
  });
};
