// app/controllers/authentication.js

var pssprt = require('passport');
var mongoose = require('mongoose');
var UserModel = mongoose.model('User');
function respondWithJSON(res, status, content) {
    res.status(status);
    res.json(content);
};

module.exports.register = function(req, res) {
    
       if(!req.body.name || !req.body.email || !req.body.password) {
   sendJSONresponse(res, 400, {
       "message": "All fields required"
     });
     return;
    }
    var user = new UserModel;
    user.name = req.body.user
    user.email = req.body.email;
    user.setPassword(req.body.password);
    user.save(function(err, savedUser) {
        if(err) {
            respondWithJSON(res, 400, {
                "error" : err
            });
            return;
        } else {
            var newToken;
            token = savedUser.getjWebToken();
            respondWithJSON(res, 200, {
                "token" : token
            });
            return;
        }
    });
};

module.exports.login = function(req, res) {
    if(!req.body.email) {
        sendJSONresponse(res, 400, {
              "error": "req.body.email is required"
        });
        return;
      }
      if(!req.body.password) {
        sendJSONresponse(res, 400, {
              "error": "req.body.password is required"
        });
        return;
      }
    
    pssprt.authenticate('local', function(err, user, info) {
        var token;
        //if passport throws/catches an error
        if(err) {
            res.status(404).json(err);
            return;
        }
        //yay! a user was found
        if(user) {
            token = user.getjWebToken();
            respondWithJSON(res, 200, {
                "token" : token
            });
            return;
        } else {
            //if user is not found
            res.status(401).json(info);
        }
    })(req, res);
};