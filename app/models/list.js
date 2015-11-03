// load the things we need
var mongoose = require('mongoose');

var listSchema = mongoose.Schema({
  title:     String,
  date:      String,
  toDo:      String
});

// create the model for list and expose it to our app
module.exports = mongoose.model('List', listSchema);
