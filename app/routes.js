// load the things we need
var User    = require('../app/models/user'), // load up the user model
    jwt     = require('jsonwebtoken'), // used to create, sign, and verify tokens
    path    = require('path');

// module.exports = function(app, passport) {
module.exports = function(app) {

  app.post('/registration', function (req, res) {

    if (!req.body.username) {
      return res.status(401).send({
        success: false,
        message: "Ooops! Name is required",
        type: 1
      });
    } else if (!req.body.email) {
      return res.status(401).send({
        success: false,
        message: "Ooops! E-mail is required",
        type: 2
      });
    } else if (!req.body.password) {
      return res.status(401).send({
        success: false,
        message: "Ooops! Password is required",
        type: 3
      });
    } else {
      User.findOne({
        name: req.body.username
      }, function(err, user) {

        if (err) throw err;

        if (user) {
          return res.status(401).send({
              success: false,
              message: "This name is already used",
              type: 1
          });
        } else {

          var newUser  = new User();
          newUser.name = req.body.username;
          newUser.email = req.body.email;
          newUser.password = newUser.generateHash(req.body.password);

          newUser.save(function(err) {
            if (err) return done(err);

            res.json({ success: true });
          });
        }
      });
    }


  });

  app.post('/authenticate', function(req, res) {

    if (!req.body.username) {
      return res.status(401).send({
        success: false,
        message: "Ooops! Name is required",
        type: 1
      });
    } else if (!req.body.password) {
      return res.status(401).send({
        success: false,
        message: "Ooops! Password is required",
        type: 2
      });
    } else {
      // find the user
      User.findOne({
        name: req.body.username
      }, function(err, user) {

        if (err) throw err;

        if (!user || !user.validPassword(req.body.password)) {
            return res.status(401).send({
                success: false,
                message: 'Wrong username or password'
            });
        } else {
          // if user is found and password is right
          // create a token
          var token = jwt.sign(user, app.get('mylittlesecret'), {
            expiresIn: "1d" // expires in 24 hours
          });

          // return the information including token as JSON
          res.json({ token: token });
        }

      });
    }
  });

  app.get('/api/account', function(req, res) {
    res.json({
      enter: "allowed"
    });
  });

  app.get("/api/lists", function(req, res) {
    var query = { name: req.user.name };

    User.findOne(query, function(err, user) {
      if (err) throw err;

      if (user) {
        res.json({ lists: user.list });
      }

    });
  });

  app.post("/api/lists", function(req, res) {

    var query = { name: req.user.name };
    User.findOne(query, function(err, user) {
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
  });

  app.post("/api/lists/toDo", function(req, res, next) {

    var query = {
      name: req.user.name
    };

    User.findOne(query, function(err, user) {
      if (err) throw err;
      var list = user.list.id(req.body.id);

      list.toDo.push({
        task: req.body.task,
      });

      user.save(function(err, done) {
        if (err) return done(err);

        // find list where been saved new to-do
        for (i = 0; i < (done.list).length; i++) {
          if (done.list[i]["_id"] == req.body.id) {
            var resultFind = done.list[i];
          }
        }

        res.json({ toDos: resultFind.toDo });
      });

    });
  });

  // redirect all others router to the index (HTML5 history)
  app.all('/*', function(req, res) {
      res.sendFile(path.resolve('public/index.html'));
  });
};
