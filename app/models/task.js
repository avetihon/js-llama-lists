// load the things we need
var mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
  title:        String,
  date:         String,
  description:  String,
  due_date:     Date,
  color:        { type: String, default: "task-color-1" },
  completed:    { type: Boolean, default: false }
});

// create the model for todo and expose it to our app
module.exports = mongoose.model('Task', taskSchema);