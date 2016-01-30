// load the things that we need
var auth      = require("../app/routes/auth"),
    user      = require("../app/routes/user"),
    list      = require("../app/routes/list"),
    task      = require("../app/routes/task"),
    path      = require("path");

module.exports = function(app) {

  /**
   * auth stuff
   **/
  app.post("/signup", auth.signup);
  app.post("/login", auth.login);


  /**
   * user stuff
   **/
  app.get("/api/user", user.getUserData);
  app.post("/api/user/avatar", user.saveAvatarImage);
  app.get("/api/user/interests", user.getInterestsList);
  app.post("/api/user/interests", user.saveInterest);
  /**
   * list stuff
   **/
  app.get("/api/lists", list.getlists);
  app.post("/api/list", list.addList);
  app.delete("/api/list/:id", list.removeList);
  app.post("/api/list/:id/image", list.setNewBackground);

  /**
   * task stuff
   **/
  app.post("/api/list/:id/task", task.addTask);
  app.get("/api/list/:id_list/task", task.getTasks);
  app.get("/api/list/:id_list/task/:id_task", task.getTask);
  app.put("/api/list/:id_list/task/:id_task", task.changeTask);
  app.delete("/api/list/:id_list/task/:id_task", task.removeTask);
  app.put("/api/list/:id_list/task/:id_task/completed", task.setTaskCompleted);

  // redirect all others router to the index (HTML5 history)
  app.all("/*", function(req, res) {
      res.sendFile(path.resolve("public/index.html"));
  });
};
