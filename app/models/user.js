// load the things we need
var mongoose     = require('mongoose'),
    bcrypt       = require('bcrypt-nodejs'),
    listShema    = require("../../app/models/list").schema; // load List shema

var userSchema = mongoose.Schema({
  name:            String,
  email:           String,
  password:        String,
  avatar:          { type: String, default: "no-avatar.jpg" },
  interests:       Array,
  lists_interests: Array,
  bio:             String,
  completed:       { type: String, default: 'visible' },
  add_task:        { type: String, default: 'bottom' },
  color_filter:    { type: String, default: 'none' },
  // lists:           { type: mongoose.Schema.Types.ObjectId, ref: 'List' }
});

// generating a hash
userSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('User', userSchema);
