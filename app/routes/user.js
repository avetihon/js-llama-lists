var User         = require("../../app/models/user"), // load up the user model
    randomString = require("randomstring"),
    fs           = require("fs");


/**
 * get all data from current user
 */
exports.getUserData = function(req, res) {
  var queryUser = { _id: req.user._id };
  User
    .findOne(queryUser)
    .select("-lists")
    .lean()
    .exec(function(err, user) {
      res.json({ user: user });
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


/**
 * load user potential interests
 */
exports.getInterestsList = function(req, res) {
  fs.readFile("config/interests.json", (err, data) => {
    if (err) throw err;
    var parsedData = JSON.parse(data);
    var interests = Object.keys(parsedData).map(function(k) { return parsedData[k] });

    res.json({interests: interests})
  });
};


/**
 * load user selected interests
 */
exports.saveInterest = function(req, res) {
  var interests = req.body.interests;
  var queryUser = { _id: req.user._id };

   User
    .findOne(queryUser)
    .select("interests")
    .exec(function (err, user) {
      if (err) throw err;
      user.interests = interests;

      user.save(function (err) {
        if (err) return handleError(err);

        res.json({ success: true });
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
