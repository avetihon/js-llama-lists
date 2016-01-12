// load the things that we need
var auth      = require("../app/routes/auth"),
    list      = require("../app/routes/list"),
    path      = require("path");

module.exports = function(app, apiRoutes) {

  /**
   * auth stuff
   **/
  app.post("/signup", auth.signup);
  app.post("/login", auth.login);

  apiRoutes.use(auth.middleware);
  /**
   * list stuff
   **/
  apiRoutes.get("/lists", list.getlists);
  apiRoutes.post("/list", list.addList);
  apiRoutes.delete("/list/:id", list.removeList);
  apiRoutes.post("/list/:id/image", list.setNewBackground);
  apiRoutes.post("/list/:id/task", list.addTask);
  apiRoutes.get("/list/:id_list/task", list.getTasks);
  apiRoutes.get("/list/:id_list/task/:id_task", list.getTask);
  apiRoutes.put("/list/:id_list/task/:id_task", list.changeTask);
  apiRoutes.delete("/list/:id_list/task/:id_task", list.removeTask);
  apiRoutes.put("/list/:id_list/task/:id_task/completed", list.setTaskCompleted);

  app.use('/api', apiRoutes);

  // redirect all others router to the index (HTML5 history)
  app.all("/*", function(req, res) {
      res.sendFile(path.resolve("public/index.html"));
  });
};
