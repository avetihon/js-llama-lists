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
  app.post("/auth/signup", auth.signup);
  app.post("/auth/login", auth.login);


  /**
   * user stuff
   **/
  app.get("/api/user", user.getUserData);
  app.put("/api/user", user.saveUserData);
  app.post("/api/user", user.saveUserPassword);
  app.put("/api/user/avatar", user.saveAvatarImage);
  app.put("/api/user/interests", user.saveInterest);
  app.get("/api/user/interests", user.getInterestsList);
  /**
   * list stuff
   **/
  app.get("/api/lists", list.getLists);
  app.post("/api/lists", list.addList);
  app.delete("/api/lists/:id", list.removeList);
  app.put("/api/lists/:id", list.updateList)

  /**
   * task stuff
   **/
  app.post("/api/lists/:id/task", task.addTask);
  app.get("/api/lists/:id_list/task", task.getTasks);
  app.get("/api/lists/:id_list/task/:id_task", task.getTask);
  app.put("/api/lists/:id_list/task/:id_task", task.updateTask);
  app.delete("/api/lists/:id_list/task/:id_task", task.removeTask);

  // redirect all others router to the index (HTML5 history)
  app.all("/*", function(req, res) {
      res.sendFile(path.resolve("public/index.html"));
  });
};
