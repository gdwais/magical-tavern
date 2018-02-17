// server.js

//  modules ===================================

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

//  configuration =============================

var db = require('./config/db');
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');

var testMode = false;  //TODO: Add test flag check here

if(testMode) {
    mongoose.connect(db.url_test);
} else {
    mongoose.connect(db.url);
}

app.use(bodyParser.json());

app.use(bodyParser.json({ type: 'application/vnd.api+json'}));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(methodOverride('X-HTTP-Method-Override'));

app.use(express.static(__dirname + '/public'));

//  routes====================

require('./app/routes')(app);  // configure our routes

//  start app ================
//  startup magical-tavern at http://localhost:8080
app.listen(port);

//  alert the user
console.log('magical-tavern running on port ' + port);

//  expose app
exports = module.exports = app;
