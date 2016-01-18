var User    = require("../../app/models/user"); // load up the user model

/**
 * save task request
 */
exports.addTask = function(req, res) {
  var listId    = req.params.id,
      task      = req.body.title,
      queryName = { name: req.decoded.name || req.decoded._doc.name };

  User.findOne(queryName, function(err, user) {
    if (err) throw err;
    var list = user.list.id(listId);

    list.task.push({
      title: task,
    });

    user.save(function(err, done) {
      if (err) return done(err);

      var task = list.task;
      res.json({ task: task });
    });
  });
};

/**
 * get one task request
 */
exports.getTask = function(req, res) {
  var listId    = req.params.id_list,
      taskId    = req.params.id_task,
      queryName = { name: req.decoded.name || req.decoded._doc.name };

  User.findOne(queryName, function(err, user) {
    if (err) throw err;
    var task = user.list.id(listId).task.id(taskId);

    res.json({ task: task });
  });
};

/**
 * get all tasks request
 */
exports.getTasks = function(req, res) {
  var listId    = req.params.id_list,
      queryName = { name: req.decoded.name || req.decoded._doc.name };

  User.findOne(queryName, function(err, user) {
    if (err) throw err;
    var tasks = user.list.id(listId).task;

    res.json({ tasks: tasks });
  });
};

/**
 * remove one task request
 */
exports.removeTask = function(req, res) {
  var listId    = req.params.id_list,
      taskId    = req.params.id_task,
      queryName = { name: req.decoded.name || req.decoded._doc.name };

  User.findOne(queryName, function(err, user) {
    if (err) throw err;
    user.list.id(listId).task.id(taskId).remove();

    user.save(function (err, done) {
      if (err) return done(err);

      res.json({ success: true });
    });
  });
};

/**
 * set task as completed or uncompleted
 */
exports.setTaskCompleted = function(req, res, next) {
  var listId    = req.params.id_list,
      taskId    = req.params.id_task,
      queryName = { name: req.decoded.name || req.decoded._doc.name };

  User.findOne(queryName, function(err, user) {
    if (err) throw err;
    var task = user.list.id(listId).task.id(taskId);

    if (task.completed) {
      task.completed = false;
    } else {
      task.completed = true;
    }

    user.save(function (err, done) {
      if (err) return done(err);

      res.json({ completed: task.completed });
    });
  });
};


/**
 * change data in task
 */
exports.changeTask = function(req, res) {
  var listId    = req.params.id_list,
      taskId    = req.params.id_task,
      dataType  = req.body.type,
      data      = req.body.data,
      queryName = { name: req.decoded.name || req.decoded._doc.name };

  User.findOne(queryName, function(err, user) {
    if (err) throw err;
    var task = user.list.id(listId).task.id(taskId);

    if (dataType === "color") {
      task.color = data;
    } else if (dataType === "title") {
      task.title = data;
    }

    user.save(function(err, done) {
      if (err) return done(err);

      res.json({ success: true });
    });
  });
};
