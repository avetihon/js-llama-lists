var express = require("express"),
	morgan = require('morgan');
	mongoose = require("mongoose"),
	bodyParser = require('body-parser'),
	port = process.env.PORT || 3000, // used to create, sign, and verify tokens
	app = express();


var configDB = require('./config/database.js');

app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.json()); // get information from html forms
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies




app.get("/", function(req, res) {
	res.render("users-auth.tpl.html");
});

app.listen(port, function() {
	console.log("Magic happens on " + port + " port");
});