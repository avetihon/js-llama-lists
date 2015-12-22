// load the things we need
var mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
  task:      String,
  date:      String,
  completed: { type: Boolean, default: false }
});

// create the model for todo and expose it to our app
module.exports = mongoose.model('Task', taskSchema);
