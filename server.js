var morgan       = require("morgan"),
	express      = require("express"),
	mongoose     = require('mongoose'),
	passport     = require("passport"),
	bodyParser   = require("body-parser"),
	jwt          = require('jsonwebtoken'), // used to create, sign, and verify tokens
	expressJwt   = require('express-jwt'), // middleware that validates JsonWebTokens
	port         = process.env.PORT || 3000,
	app          = express();
	var path = require('path');


var configDB   = require('./config/database.js'); // connect to our database
var configAuth = require('./config/auth'); // get auth

mongoose.connect(configDB.url); // connect to our database


app.use(express.static(__dirname + '/public')); // sets the static files location to public
app.use(express.static(__dirname + '/public/scripts/core'));
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json

// We are going to protect /api routes with JWT
app.use('/api', expressJwt({secret: configAuth.secret}));
app.set('superSecret', configAuth.secret);

// routes ======================================================================
require('./app/routes.js')(app); // load our routes and pass in our app and fully configured passport

module.exports = app;
app.listen(port, function() {
	console.log("Magic happens on this " + port + " port");
});