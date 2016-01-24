var User    = require("../../app/models/user"), // load up the user model
    jwt     = require("jsonwebtoken"), // used to create, sign, and verify tokens
    app     = require("../../server.js");

/**
 * signup request
 */
exports.signup = function(req, res) {

  if (!req.body.username || !req.body.email || !req.body.password) {

    return res.status(400).send({
      success: false,
      message: "Ooops! All fields is required"
    });
  } else {

    User
      .findOne({ name: req.body.username })
      .exec(function (err, user) {

        if (err) throw err;

        // if find user with name in request
        if (user) {
          // return 422 status
          return res.status(422).send({
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

  if (!req.body.username || !req.body.password) {

    return res.status(400).send({
      success: false,
      message: "Ooops! All fields is required",
    });
  } else {
    // find the user
    User
      .findOne({ name: req.body.username })
      .exec(function (err, user) {

        if (err) throw err;

        if (!user || !user.validPassword(req.body.password)) {
            return res.status(422).send({
                success: false,
                message: 'Wrong username or password'
            });
        } else {
          // if user is found and password is right
          // create a token
          var token = jwt.sign(user.toObject(), app.app.get('mylittlesecret'), { // little stupid code, another answers i haven't found
            expiresIn: "7d" // expires in 168 hours
          });

          // return the information including token as JSON
          res.json({ token: token });
        }
      });
  }
};
