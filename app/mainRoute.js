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
  app.get("/api/lists", list.lists);
  app.post("/api/lists", list.addList);
  app.post("/api/lists/toDo", list.addTodo);

  // redirect all others router to the index (HTML5 history)
  app.all("/*", function(req, res) {
      res.sendFile(path.resolve("public/index.html"));
  });
};
