//  app/models/user.js

var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({ username: 'string', password: 'string', datecreated: { type: Date, default: Date.now }});

//  define our user model
module.exports = mongoose.model('User', UserSchema);