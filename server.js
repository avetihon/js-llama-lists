var morgan = require('morgan'),
	express = require("express"),
	passport = require('passport'),
	mongoose = require("mongoose"),
	bodyParser = require('body-parser'),
	flash = require('connect-flash'),
	cookieParser = require('cookie-parser'),
	session = require('express-session'),
	port = process.env.PORT || 3000, // used to create, sign, and verify tokens
	app = express();


var configDB = require('./config/database.js'); // connect to our database

require('./config/passport')(passport); // pass passport for configuration


app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ 
	secret: 'hoovesandhorns',
	resave: true,
    saveUninitialized: true 
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

app.listen(port, function() {
	console.log("Magic happens on " + port + " port");
});