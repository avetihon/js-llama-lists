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

  app.get('/api/account', function (req, res) {
    res.json({
      enter: "allowed"
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
