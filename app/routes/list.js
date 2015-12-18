var User    = require("../../app/models/user"); // load up the user model

/**
 * lists request
 */
exports.lists = function(req, res) {
  var query = { name: req.user.name };

  User.findOne(query, function(err, user) {
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
  var query = { name: req.user.name };

  User.findOne(query, function(err, user) {
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
 * save todo request
 */
exports.addTodo = function(req, res) {

  var query = {
    name: req.user.name
  };

  User.findOne(query, function(err, user) {
    if (err) throw err;
    var list = user.list.id(req.body.id);

    list.toDo.push({
      task: req.body.task,
    });

    user.save(function(err, done) {
      if (err) return done(err);

      // find list where will be save new to-do
      for (i = 0; i < (done.list).length; i++) {
        if (done.list[i]["_id"] == req.body.id) {
          var resultFind = done.list[i];
        }
      }

      res.json({ toDos: resultFind.toDo });
    });
  });
};

