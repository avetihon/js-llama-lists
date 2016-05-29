var User         = require("../../app/models/user"); // load up the user model
var List         = require("../../app/models/list"); // load up the list model

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
    .slice('interests', 3) // get in interests only 3 interest
    .lean()
    .exec(function(err, users) {
      res.json({ users: users });
    });
}


exports.getLists = function(req, res) {
  var query = req.body.query;

  console.log(query)
  List
    .search({
      query_string: { query: query },
    }, function(err, results) {

      var resultsId = results.hits.hits.map(item => item._id);

      List
        .find({
          $and: [{ '_id': { $in: resultsId } },
                 { 'owner': { $ne: req.user._id } },
                 { 'members': { $ne: req.user._id } }]
        })
        .populate({
          path: 'owner',
          select: 'name avatar',
        })
        .populate({
          path: 'members',
          select: 'name',
        })
        .exec(function(err, lists) {
          console.log(lists)
          res.status(200).json({ lists: lists });
        })
    });
}
