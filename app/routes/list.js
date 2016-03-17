var List    = require("../../app/models/list"); // load up the list model

/**
 * get all lists request
 */
exports.getLists = function(req, res) {

  List
    .find({ 'owner': req.params.id })
    .lean() // return plain js object, faster then mongo document
    .exec(function(err, lists) {
      if (err) throw err;

      res.json({ lists: lists });
  });
};

/**
 * save list request
 */
exports.addList = function(req, res) {

  var newList  = new List();
  newList.title = req.body.title;
  newList.owner = req.user.name;

  newList.save(function(err, done) {
    if (err) return done(err);

    res.json({ success: true });
  });
};

/**
 * remove list request
 */
exports.removeList = function(req, res) {
  var listId = req.params.id;

  List
    .findById(listId)
    .exec(function(err, list) {
      if (err) throw err;

      list.remove();

      list.save(function (err, done) {
        if (err) return done(err);

        res.json({ success: true });
      });
  });
};

/**
 * put changes in list
 */
exports.updateList = function(req, res) {
  var listId = req.params.id;

  List
    .findById(listId)
    .exec(function(err, list) {
      if (err) throw err;

      if (req.body.image) {
        list.image = req.body.image;
      } else if (req.body.title) {
        list.title = req.body.title;
      }

      list.save(function(err, done) {
        if (err) return done(err);

        res.json({ success: true });
      });
  });
}
