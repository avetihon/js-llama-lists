// load the things we need
var auth    = require("../app/routes/auth"),
    list    = require("../app/routes/list"),
    path    = require("path");

module.exports = function(app) {

  /**
   * auth stuff
   **/
  app.post("/signup", auth.signup);
  app.post("/login", auth.login);

  /**
   * list stuff
   **/
  app.get("/api/lists", list.getlists);
  app.post("/api/list", list.addList);
  app.delete("/api/list/:id", list.removeList);
  app.post("/api/list/:id/image", list.setNewBackground);
  app.post("/api/list/:id/task", list.addTask);
  app.get("/api/list/:id_list/task", list.getTasks);
  app.get("/api/list/:id_list/task/:id_task", list.getTask);
  app.put("/api/list/:id_list/task/:id_task", list.changeTask);
  app.delete("/api/list/:id_list/task/:id_task", list.removeTask);
  app.put("/api/list/:id_list/task/:id_task/completed", list.setTaskCompleted);

  // redirect all others router to the index (HTML5 history)
  app.all("/*", function(req, res) {
      res.sendFile(path.resolve("public/index.html"));
  });
};
