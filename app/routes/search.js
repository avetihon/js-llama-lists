var User         = require("../../app/models/user"); // load up the user model

exports.getUsers = function(req, res) {
  // var queryUser = { name: { new RegExp(req.body.name , 'i' ) } };
  var queryUser = {
    $and: [
      { name: { $nin : req.body.usedNames } },
      { name: new RegExp(req.body.name , 'i' ) },
    ]};
  User
    .find(queryUser)
    .limit(10)
    .select("-lists")
    // .slice('interests', 3) // get in interests only 3 interest
    .lean()
    .exec(function(err, users) {
      res.json({ users: users });
    });
}
