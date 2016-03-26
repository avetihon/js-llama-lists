// load the things we need
var mongoose   = require('mongoose')
    taskShema  = require("../../app/models/task").schema; // load task shema;

var listSchema = mongoose.Schema({
  title:     String,
  tags:      Array,
  image:     { type: String, default: "list-background-1" },
  owner:     { type: String, ref: 'User' },
  members:   [{ type: String, ref: 'User' }],
  tasks:     [taskShema]
});

// create the model for list and expose it to our app
module.exports = mongoose.model('List', listSchema);
