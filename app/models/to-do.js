// load the things we need
var mongoose = require('mongoose');

var toDoSchema = mongoose.Schema({
  task:     String,
  date:      String
});

// create the model for list and expose it to our app
module.exports = mongoose.model('ToDo', toDoSchema);
