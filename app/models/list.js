// load the things we need
// var mongoosastic = require("mongoosastic");
var mongoose     = require('mongoose');
// var es           = require('elasticsearch');
var taskShema    = require("../../app/models/task").schema; // load task shema;

// var esClient = new es.Client({host: 'localhost:9200'});

var listSchema = mongoose.Schema({
  title:     { type: String},
  tags:      Array,
  image:     { type: String, default: "list-background-1" },
  owner:     { type: String, ref: 'User' },
  members:   [{ type: String, ref: 'User' }],
  likes:     Array,
  tasks:     [taskShema]
});

// listSchema.plugin(mongoosastic, {
//   esClient: esClient
// });

// create the model for list and expose it to our app
module.exports = mongoose.model('List', listSchema);
