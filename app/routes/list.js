var User    = require("../../app/models/user"); // load up the user model

/**
 * get all lists request
 */
exports.getLists = function(req, res) {
  var queryUser = { name: req.params.id };

  User
    .findOne(queryUser)
    .select("lists")
    .lean() // return plain js object, faster then mongo document
    .exec(function(err, user) {
      if (err) throw err;

      if (user) {
        res.json({ lists: user.lists });
      } else {
        return res.status(404).send({
          success: false
        });
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
 * put changes in list
 */
exports.updateList = function(req, res) {
  var listId    = req.params.id;
  var queryUser = { _id: req.user._id };

  User
    .findOne(queryUser)
    .select("lists")
    .exec(function(err, user) {
      if (err) throw err;

      var list = user.lists.id(listId);

      if (req.body.image) {
        list.image = req.body.image;
      } else if (req.body.title) {
        list.title = req.body.title;
      }

      user.save(function(err, done) {
        if (err) return done(err);

        res.json({ success: true });
      });
  });
}
