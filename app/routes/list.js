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
 * remove list request
 */
exports.removeList = function(req, res) {
  var listId = req.params.id,
      query = req.user.name;

  User.findOne(query, function(err, user) {
    if (err) throw err;

    user.list.id(listId).remove();

    user.save(function (err, done) {
      if (err) return done(err);
      res.json({ lists: done.list }); // return new array of list
    });
  });
}

/**
 * save task request
 */
exports.addTask = function(req, res) {
  var listId    = req.params.id,
      queryName = req.user.name,
      task      = req.body.task;

  User.findOne(queryName, function(err, user) {
    if (err) throw err;
    var list = user.list.id(listId);

    list.task.push({
      task: task,
    });

    user.save(function(err, done) {
      if (err) return done(err);

      var taskList = list.task;
      res.json({ taskList: taskList });
    });
  });
};


/**
 * set task as completed or uncompleted
 */
exports.setTaskCompleted = function(req, res, next) {
  var listId    = req.params.id_list,
      taskId    = req.params.id_task,
      queryName = req.user.name;

  User.findOne(queryName, function(err, user) {
    if (err) throw err;
    var task = user.list.id(listId).task.id(taskId);

    if (task.completed) {
      task.completed = false;
    } else {
      task.completed = true;
    }

    user.save(function(err, done) {
      if (err) return done(err);

      // var taskList = list.task;
      res.json({ taskData: task.completed });
    });


    // list.task.push({
    //   task: task,
    // });

    // user.save(function(err, done) {
    //   if (err) return done(err);

    //   var taskList = list.task;
    //   res.json({ taskList: taskList });
    // });
  });
};

