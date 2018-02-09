//  app/routes.js
var User = require('./models/user');
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'SOME_CRAZY_STRING',
  userProperty: 'payload'
});

var ProfileController = require('../controllers/profile');
var AuthenticationController = require('../controllers/authentication');

module.exports = function(app) {
    
    /*
        Authentication endpoints
    */

    app.get('/api/profile', auth, ProfileController.getProfile);
    app.post('/api/register', AuthenticationController.register);
    app.post('api/login', AuthenticationController.login);
    
    app.get('/api/users', function(req, res) {
        User.find(function(err, response) {
            if (err) {
                res.send(err);
            } else {
                res.json(response); 
            }
        })
    });

    app.get('/api/users/:username', function(req, res) {
        debugger;
        var username = req.params.username;
        User.find({ username: username }, function(err, response) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                
                res.json(response);
            }
        })
    });

    app.post('/api/users', function(req, res) {
        User.create(req.body, function(err, response) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.json(response);
            }
        });
    });

    app.put('/api/users/:username', function(req, res) {
        //in progress
        User.update(req.body, function(err, response) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.json(response);
            }
        });
    });

    app.delete('/api/users/:username', function(req, res) {
        var username = req.params.username;
        User.deleteOne({ username: username}, function(err, response) {
            if (err){
                console.log(err);
                res.send(err);
            } else {
                res.json(response);
            }
        })
    });
    //  frontend routes =====================
    app.get('*', function(req, res) {
        res.sendfile('./public/views/index.html');
    });
}