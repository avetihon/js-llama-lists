var User    = require("../../app/models/user"); // load up the user model

/**
 * lists request
 */
exports.getlists = function(req, res) {
  var queryName = { name: req.decoded.name || req.decoded._doc.name }; // for Amazon EC2 unusual bug
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
  var queryName = { name: req.decoded.name || req.decoded._doc.name };

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
      queryName = { name: req.decoded.name || req.decoded._doc.name };

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
      queryName = { name: req.decoded.name || req.decoded._doc.name };

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

    user.save(function(err, done) {
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
    }

    user.save(function(err, done) {
      if (err) return done(err);

      res.json({ success: true });
    });
  });
};
