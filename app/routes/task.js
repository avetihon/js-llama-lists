var User    = require("../../app/models/user"); // load up the user model

/**
 * save task request
 */
exports.addTask = function(req, res) {
  var listId    = req.params.id;
  var taskText  = req.body.text;
  var queryUser = { _id: req.user._id };

  User
    .findOne(queryUser)
    .select("lists._id lists.tasks")
    .exec(function (err, user) {
      if (err) throw err;

      var list = user.lists.id(listId);

      list.tasks.push({
        text: taskText,
      });

      user.save(function(err, done) {
        if (err) return done(err);

        res.json({ tasks: list.tasks });
      });
    });
};

/**
 * get one task request
 */
exports.getTask = function(req, res) {
  var listId    = req.params.id_list;
  var taskId    = req.params.id_task;
  var queryUser = { _id: req.user._id };

  User
    .findOne(queryUser)
    .select("lists._id lists.tasks")
    .exec(function (err, user) {
      if (err) throw err;

      var task = user.lists.id(listId).tasks.id(taskId);
      res.json({ task: task });
  });
};

/**
 * get all tasks request
 */
exports.getTasks = function(req, res) {
  console.log(req.params)
  var listId    = req.params.id_list;
  var queryUser = { _id: req.user._id };

  User
    .findOne(queryUser)
    .select("lists._id lists.tasks")
    .exec(function (err, user) {
      if (err) throw err;

      var tasks = user.lists.id(listId).tasks;
      res.json({ tasks: tasks });
  });
};

/**
 * remove one task request
 */
exports.removeTask = function(req, res) {
  var listId    = req.params.id_list;
  var taskId    = req.params.id_task;
  var queryUser = { _id: req.user._id };

  User
    .findOne(queryUser)
    .select("lists._id lists.tasks")
    .exec(function (err, user) {
      if (err) throw err;

      user.lists.id(listId).tasks.id(taskId).remove();
      user.save(function (err, done) {
        if (err) return done(err);

        res.json({ success: true });
      });
  });
};

/**
 * put changes in task
 */
exports.updateTask = function(req, res, next) {
  var listId    = req.params.id_list;
  var taskId    = req.params.id_task;
  var queryUser = { _id: req.user._id };

  User
    .findOne(queryUser)
    .select("lists._id lists.tasks")
    .exec(function (err, user) {
      if (err) throw err;

      var task = user.lists.id(listId).tasks.id(taskId);

      if (req.body.completed) {
        task.completed = (task.completed)
          ? false
          : true;
      } else if (req.body.color) {
        task.color = req.body.color;
      } else if (req.body.text) {
        task.text = req.body.text;
      }


      user.save(function (err, done) {
        if (err) return done(err);

        res.json({ task: task });
      });
  });
};
