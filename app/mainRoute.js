// load the things that we need
var auth      = require('../app/routes/auth'),
    user      = require('../app/routes/user'),
    list      = require('../app/routes/list'),
    task      = require('../app/routes/task'),
    data      = require('../app/routes/data'),
    search    = require('../app/routes/search'),
    path      = require('path');

module.exports = function(app) {

  /**
   * auth stuff
   **/
  app.post('/auth/signup', auth.signup);
  app.post('/auth/login', auth.login);


  /**
   * user stuff
   **/
  app.get('/api/user/:name', user.getUserData);
  app.put('/api/user', user.saveUserData);
  app.post('/api/user', user.saveUserPassword);
  app.put('/api/user/avatar', user.saveAvatarImage);
  // app.put('/api/user/interests', user.saveInterest);

  /**
   * list stuff
   **/
  app.get('/api/lists/:id', list.getLists);
  app.post('/api/lists', list.addList);
  app.delete('/api/lists/:id', list.removeList);
  app.put('/api/lists/:id', list.updateList);

  /**
   * task stuff
   **/
  app.get('/api/lists/:id_list/task/:id_task', task.getTask);
  app.get('/api/lists/:id_list/task', task.getTasks);
  app.post('/api/lists/:id/task', task.addTask);
  app.put('/api/lists/:id_list/task/:id_task', task.updateTask);
  app.delete('/api/lists/:id_list/task/:id_task', task.removeTask);

  /**
   * Different data stuff
   **/
  app.get('/api/data/interests', data.getInterestsList);

  /**
   * search stuff
   **/
  app.post('/api/search/users', search.getUsers);

  // redirect all others router to the index (HTML5 history)
  app.all('/*', function(req, res) {
      res.sendFile(path.resolve('public/index.html'));
  });
};
