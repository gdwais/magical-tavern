// app/controllers/profile.js

var mongoose = require('mongoose');
var UserModel = mongoose.model('User');

module.exports.getProfile = function(req, res) {

  if (!req.payload._id) {
    res.status(401).json({
      "error" : "UnauthorizedError: private profile"
    });
  } else {
    var payloadId = req.payload._id;
    UserModel.findById(payloadId).exec(function(err, foundUser) {
        res.status(200).json(foundUser);
    });
  }

};
