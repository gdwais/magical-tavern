//  app/models/user.js

var mongoose = require('mongoose');

//  define our user model
module.exports = mongoose.model('User', {
    username: {type: String, default: ''},
    password: { type : String, default: ''},
    datecreated: { type: Date, default: Date.now }

});