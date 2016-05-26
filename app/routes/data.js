var User         = require("../../app/models/user"); // load up the user model
var List         = require("../../app/models/list"); // load up the list model
var fs           = require("fs");

/**
 * load user potential interests
 */
exports.getInterestsList = function(req, res) {
  fs.readFile("config/interests.json", (err, data) => {

    if (err) throw err;
    var parsedData = JSON.parse(data);
    var interests = Object.keys(parsedData).map((k) => parsedData[k] );


    res.json({ interests: interests });
  });
};

exports.getRecomendationLists = function(req, res) {
  console.log(req.user._id)
  User
    .findById(req.user._id)
    .exec(function(err, user) {
      if (err) throw err;

      var listInterests = user.lists_interests;

      List
        .find({ tags: { $in: listInterests }, owner: { $ne: user._id }})
        .populate('members owner', '-password')
        .exec(function(err, lists) {
          if (err) throw err;

          res.status(200).json({ lists: lists });
        })
    });
}
