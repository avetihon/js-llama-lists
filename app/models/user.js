// load the things we need
var mongoose     = require('mongoose'),
    bcrypt       = require('bcrypt-nodejs'),
    listShema    = require("../../app/models/list").schema; // load List shema

var userSchema = mongoose.Schema({
  name:      String,
  email:     String,
  password:  String,
  avatar:    { type: String, default: "no-avatar.jpg" },
  lists:     [listShema]
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
