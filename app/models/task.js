// load the things we need
var mongoose = require('mongoose');

var taskSchema = mongoose.Schema({
  text:           String,
  date:           String,
  description:    String,
  due_date:       Date,
  created:        { type: Date, default: Date.now },
  add_to:         { type: String, default: 'bottom' },
  color:          { type: String, default: 'gray' },
  completed:      { type: Boolean, default: false }
});

// create the model for todo and expose it to our app
module.exports = mongoose.model('Task', taskSchema);
