var User         = require("../../app/models/user"), // load up the user model
    randomString = require("randomstring"),
    fs           = require("fs");


/**
 * get all data from current user
 */
exports.getUserData = function(req, res) {

  var queryUser = { name: req.params.name };

  User
    .findOne(queryUser)
    .select("-lists")
    .lean()
    .exec(function(err, user) {
      res.status(200).json({ user: user });
    });
}

/**
 * save some data to current user (with checks)
 */
exports.saveUserData = function(req, res) {
  var queryUser = { _id: req.user._id };

  // im using nested query, because i didn't find more pretty solution, sorry =(o_o)=
  User
    .findOne(queryUser)
    .select("-lists")
    .exec(function(err, user) {
      var currentName = user.name;

      User
        .findOne({ name: req.body.user.name })
        .select("name")
        .exec(function(err, done) {
          if (done && done.name !== currentName) {
            return res.status(422).send({
                success: false,
                message: "This name is already used",
            });
          } else {

            user.name = req.body.user.name;
            user.email = req.body.user.email;
            user.interests = req.body.user.interests;
            user.lists_interests = req.body.user.lists_interests;
            user.bio = req.body.user.bio;

            user.save(function (err) {
              if (err) return handleError(err);

              res.json({ success: true, message: "Your account has been updated." });
            });
          }
        });
    });
}

/**
 * save new password to current user
 */
exports.saveUserPassword = function(req, res) {
  var userData = req.body;
  var queryUser = { _id: req.user._id };

  User
    .findOne(queryUser)
    .select("password")
    .exec(function(err, user) {
      if(!user.validPassword(userData.oldPass)) {
        return res.status(422).send({
            success: false,
            message: 'The current password is incorrect'
        });
      } else {
        user.password = user.generateHash(userData.newPass);

        user.save(function (err) {
          if (err) return handleError(err);

          res.json({ success: true, message: "Your password has been changed." });
        });
      }
    });
}

/**
 * save avatar for user
 */
exports.saveAvatarImage = function(req, res) {
  var image     = req.body.avatar;
  var queryUser = { _id: req.user._id };

  var path        = "public/img/users-avatar/";
  var imageBuffer = decodeBase64Image(image);
  var uniqueName  = randomString.generate();
  var fullPath    = path + uniqueName + ".jpg";

  fs.writeFile(fullPath, imageBuffer.data, function(err){
      if (err) throw err;

      User
        .findOne(queryUser)
        .select("avatar")
        .exec(function(err, user) {
          if (err) throw err;

          /**
           * remove previous avatar from file system
           */
          if (user.avatar.localeCompare("no-avatar.jpg") !== 0) {
            fs.unlink(path + user.avatar, function(err) {
               if (err) throw err;
            });
          }

          user.avatar = uniqueName + ".jpg";

          user.save(function (err) {
            if (err) return handleError(err);

            res.json({ avatar: user.avatar });
          });
      });
  });
};

function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  var response = {};

  response.type = matches[1];
  response.data = new Buffer(matches[2], "base64");

  return response;
}
