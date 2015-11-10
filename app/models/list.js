// load the things we need
var mongoose   = require('mongoose')
    toDoShema  = require("../../app/models/to-do").schema; // load to-do model;

var listSchema = mongoose.Schema({
  title:     String,
  date:      String,
  toDo:      [toDoShema]
});

// create the model for list and expose it to our app
module.exports = mongoose.model('List', listSchema);
