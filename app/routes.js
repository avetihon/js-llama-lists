// load the things we need
var User    = require('../app/models/user'), // load up the user model
    jwt     = require('jsonwebtoken'), // used to create, sign, and verify tokens
    path    = require('path');

// module.exports = function(app, passport) {
module.exports = function(app) {

  app.post('/registration', function (req, res) {

    if (typeof req.body.username === "undefined" || typeof req.body.password === "undefined") {

      res.json({ success: false, message: 'Registration failed.' });
    } else {

      var newUser = new User({
          name: req.body.username,
          password: req.body.password
      });

      newUser.save(function(err) {
        if (err) return done(err);

        console.log('User saved successfully');
        res.json({ success: true });
      });
    }
  });

  app.post('/authenticate', function(req, res) {

    // find the user
    User.findOne({
      name: req.body.username
    }, function(err, user) {

      if (err) throw err;

      if (!user) {
          console.log('Authentication failed. User not found.')
          return res.status(401).send({
              success: false,
              message: 'Wrong user'
          });
      } else if (user) {
        // check if password matches
        if (user.password != req.body.password) {
          console.log('Authentication failed. Wrong password.')
          return res.status(401).send({
              success: false,
              message: 'Wrong password'
          });
        } else {

          console.log('user is found and password is right.');
          // if user is found and password is right
          // create a token
          var token = jwt.sign(user, app.get('mylittlesecret'), {
            expiresIn: "1d" // expires in 24 hours
          });

          // return the information including token as JSON
          res.json({ token: token });
        }
      }

    });
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

  //testing function
  app.get('/users', function(req, res) {
    User.find({}, function(err, users) {
      res.json(users);
    });
  });

  // var apiRoutes = express.Router();

  // apply the routes to our application with the prefix /api
  // app.use('/api', apiRoutes);

  // redirect all others router to the index (HTML5 history)
  app.all('/*', function(req, res) {
      res.sendFile(path.resolve('public/index.html'));
  });
};
