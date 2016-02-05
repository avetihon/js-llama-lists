var User    = require("../../app/models/user"); // load up the user model

/**
 * get all lists request
 */
exports.getlists = function(req, res) {
  var queryUser = { _id: req.user._id };

  User
    .findOne(queryUser)
    .select("lists")
    .lean() // return plain js object, faster then mongo document
    .exec(function(err, user) {
      if (err) throw err;

      if (user) {
        res.json({ lists: user.lists });
      }
  });
};

/**
 * save list request
 */
exports.addList = function(req, res) {
  var queryUser = { _id: req.user._id };

  User
    .findOne(queryUser)
    .select("lists")
    .exec(function(err, user) {
      if (err) throw err;

      user.lists.push({
        title: req.body.title,
        date: req.body.date
      });

      user.save(function(err, done) {
        if (err) return done(err);

        res.json({ lists: done.lists });
      });
    });
};

/**
 * remove list request
 */
exports.removeList = function(req, res) {
  var listId    = req.params.id;
  var queryUser = { _id: req.user._id };

  User
    .findOne(queryUser)
    .select("lists")
    .exec(function(err, user) {
      if (err) throw err;

      user.lists.id(listId).remove();

      user.save(function (err, done) {
        if (err) return done(err);

        res.json({ lists: done.lists }); // return new array of list
      });
  });
};

/**
 * set new background for list request
 */
exports.setNewBackground = function(req, res) {
  var listId    = req.params.id;
  var image     = req.body.imageName;
  var queryUser = { _id: req.user._id };

  User
    .findOne(queryUser)
    .select("lists._id lists.image")
    .exec(function(err, user) {
      if (err) throw err;

      var list = user.lists.id(listId);
      list.image = image;

      user.save(function(err, done) {
        if (err) return done(err);

        res.json({ success: true });
      });
  });
};


/**
 * set new background for list request
 */
exports.setNewTitle = function(req, res) {
  var listId    = req.params.id;
  var title     = req.body.title;
  var queryUser = { _id: req.user._id };

  User
    .findOne(queryUser)
    .select("lists._id lists.title")
    .exec(function(err, user) {
      if (err) throw err;

      var list = user.lists.id(listId);
      list.title = title;

      user.save(function(err, done) {
        if (err) return done(err);

        res.json({ success: true });
      });
  });
};
