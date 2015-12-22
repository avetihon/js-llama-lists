// load the things we need
var mongoose   = require('mongoose')
    taskShema  = require("../../app/models/task").schema; // load to-do shema;

var listSchema = mongoose.Schema({
  title:     String,
  date:      String,
  task:      [taskShema]
});

// create the model for list and expose it to our app
module.exports = mongoose.model('List', listSchema);
