var List    = require("../../app/models/list"); // load up the list model

/**
 * get all tasks request
 */
exports.getTasks = function(req, res) {
  var listId    = req.params.id_list;

  List
    .findById(listId)
    .select("tasks")
    .exec(function (err, list) {
      if (err) throw err;

      var tasks = list.tasks;
      res.json({ tasks: tasks });
  });
};

/**
 * get one task request
 */
exports.getTask = function(req, res) {
  var listId    = req.params.id_list;
  var taskId    = req.params.id_task;

  List
    .findById(listId)
    .select("tasks")
    .exec(function (err, list) {
      if (err) throw err;

      var task = list.tasks.id(taskId);
      res.json({ task: task });
  });
};

/**
 * save task request
 */
exports.addTask = function(req, res) {
  var listId    = req.params.id;

  List
    .findById(listId)
    .select("tasks")
    .exec(function (err, list) {
      if (err) throw err;

      list.tasks.push({
        text: req.body.text,
      });

      list.save(function(err, done) {
        if (err) return done(err);

        res.json({ tasks: list.tasks });
      });
    });
};

/**
 * remove one task request
 */
exports.removeTask = function(req, res) {
  var listId    = req.params.id_list;
  var taskId    = req.params.id_task;

  List
    .findById(listId)
    .select("tasks")
    .exec(function (err, list) {
      if (err) throw err;

      list.tasks.id(taskId).remove();

      list.save(function (err, done) {
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

  List
    .findById(listId)
    .select("tasks")
    .exec(function (err, list) {
      if (err) throw err;

      var task = list.tasks.id(taskId);

      if (req.body.completed) {
        task.completed = (task.completed)
          ? false
          : true;
      } else if (req.body.color) {
        task.color = req.body.color;
      } else if (req.body.text) {
        task.text = req.body.text;
      }


      list.save(function (err, done) {
        if (err) return done(err);

        res.json({ task: task });
      });
  });
};
