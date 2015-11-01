// load up the user model
var User    = require('../app/models/user');
var jwt     = require('jsonwebtoken'); // used to create, sign, and verify tokens
var express = require("express");

// module.exports = function(app, passport) {
module.exports = function(app) {

// normal routes ===============================================================

    // show the home page (will also have our login links)
    // app.get('/', function(req, res) {
    //     res.json({ a: "test" });
    // });

    app.post('/registration', function (req, res) {

        if (typeof req.body.username === "undefined" || typeof req.body.password === "undefined") {

            console.log("Registration failed.")
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
            var token = jwt.sign(user, app.get('superSecret'), {
              expiresIn: "1d" // expires in 24 hours
            });

            // return the information including token as JSON
            res.json({ token: token });
          }   
        }

      });
    });


    app.get('/api/restricted', function (req, res) {
      res.json({
        name: 'Entrance allowed eeeeahhh'
      });
    });

    app.get('/api/account', function (req, res) {
      res.json({ enter: "allowed"});
    });

    //testing function
    app.get('/users', function(req, res) {
      User.find({}, function(err, users) {
        res.json(users);
      });
    });

    // var apiRoutes = express.Router(); 

    // app.get('/api/test', function(req, res) {
    //     res.json({ b: "another test" });
    // });

    

    //testing function
    // app.get('/setup', function(req, res) {

    //   // create a sample user
    //   var eugene = new User({ 
    //     name: 'eugene', 
    //     password: '1111'
    //   });

    //   // // save the sample user
    //   eugene.save(function(err) {
    //     if (err) return done(err);

    //     console.log('User saved successfully');
    //     res.json({ success: true });
    //   });
    // });

       

    

    // route to authenticate a user (POST http://localhost:8080/api/authenticate)
    //...

    // route middleware to verify a token
    // apiRoutes.use(function(req, res, next) {
    //     console.log(11111111)
    //   // check header or url parameters or post parameters for token
    //   var token = req.body.token || req.query.token || req.headers['x-access-token'];
    //   console.log(token);
    //   // decode token
    //   if (token) {

    //     // verifies secret and checks exp
    //     jwt.verify(token, app.get('superSecret'), function(err, decoded) {      
    //       if (err) {
    //         return res.json({ success: false, message: 'Failed to authenticate token.' });    
    //       } else {
    //         // if everything is good, save to request for use in other routes
    //         req.decoded = decoded;    
    //         next();
    //       }
    //     });

    //   } else {

    //     // if there is no token
    //     // return an error
    //     return res.status(403).send({ 
    //         success: false, 
    //         message: 'No token provided.' 
    //     });
        
    //   }
    // });

    // route to show a random message (GET http://localhost:8080/api/)
    //...

    // route to return all users (GET http://localhost:8080/api/users)
    //...

    // apply the routes to our application with the prefix /api
    // app.use('/api', apiRoutes);

    
    
    // redirect all others to the index (HTML5 history)
    // refactoring this ugly code
    app.all('/*', function(req, res) {
        var cwd = process.cwd();
        var indexFile = cwd + "/public/index.html";
        res.sendFile(indexFile);
        //res.sendFile('public/index.html');
        //res.sendFile(path.join(__dirname, '../public/index.html'));
        //res.sendFile('../public/index.html', { root: __dirname });
        //res.sendFile(path.resolve(__dirname + 'public/index.html'));
    });
};
