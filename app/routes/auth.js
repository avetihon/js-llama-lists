var User    = require("../../app/models/user"), // load up the user model
    jwt     = require("jsonwebtoken"), // used to create, sign, and verify tokens
    app     = require("../../server.js");

/**
 * signup request
 */
exports.signup = function(req, res) {
  var reqIsEmpty = !!Object.keys(req.body).length; // check is request body empty -> convert to bool
  if (!reqIsEmpty) {

    return res.status(401).send({
      success: false,
      message: "Ooops! All fields is required",
      type: 4
    });
  } else if (!req.body.username) {

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

      // if find user with name in request
      if (user) {
        // return 401 status
        return res.status(401).send({
            success: false,
            message: "This name is already used",
            type: 1
        });
      } else {

        // create new user
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
};

/**
 * login request
 */
exports.login = function(req, res) {
  var reqIsEmpty = !!Object.keys(req.body).length; // check is request body empty -> convert to bool

  if (!reqIsEmpty) {

    return res.status(401).send({
      success: false,
      message: "Ooops! All fields is required",
      type: 3
    });
  } else if (!req.body.username) {

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
        var token = jwt.sign(user, app.app.get('mylittlesecret'), { // little stupid code, another answers i haven't found
          expiresIn: "1d" // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({ token: token });
      }
    });
  }
};

/**
 * route middleware to authenticate and check token
 * Thank for Chris Sevilleja and his tutorial :)
 */
exports.middleware = function(req, res, next) {

  // check header for token
  var token = req.headers["authorization"].slice(7); // remove Bearer word

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, app.app.get('mylittlesecret'), function(err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });

  }

};
