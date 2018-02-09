//  app/models/user.js

var mongoose = require('mongoose');
var crypto = require('crypto');
var jWebToken = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    email: {
      type: String,
      unique: true,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    hash: String,
    salt: String,
    date_created: {
        type: Date,
        default: Date.now
    }
  });

  userSchema.methods.setPassword = function(passwrd){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(passwrd, this.salt, 1000, 64, 'sha512').toString('hex');
  };

  userSchema.methods.validPassword = function(psswrd) {
    var hash = crypto.pbkdf2Sync(psswrd, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
  };

  userSchema.methods.getjWebToken = function() {
      var expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 15);

      return jWebToken.sign({
        _id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expirationDate.getTime() / 1000),
      }, "SOME_CRAZY_STRING");  // TODO: Move this out of here
      });
    };
//  define our user model
module.exports = mongoose.model('User', userSchema);