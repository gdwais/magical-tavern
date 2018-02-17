// app/controllers/character.js
var mongoose = require('mongoose');
debugger;
var CharacterModel = mongoose.model('Character');


module.exports.getCharacters = function(req, res) {
    if (!req.payload._id) {
      res.status(401).json({
        "error" : "UnauthorizedError: private profile"
      });
    } else {
      var userId = req.payload._id;
      CharacterModel.find({ user_id : userId})(function(err, foundCharacters) {
          if(err) {
            res.status(400).json({
                "error" : err
            });  
          } else {
            res.status(200).json(foundCharacters);
          }  
      })
    }
  
  };
