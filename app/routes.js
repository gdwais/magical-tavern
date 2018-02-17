//  app/routes.js

//models
var UserModel = require('./models/user');
var CharacterModel = require('./models/character');

var jwt = require('express-jwt');
var auth = jwt({
  secret: 'SOME_CRAZY_STRING',
  userProperty: 'payload'
});

//controllers
var ProfileController = require('./controllers/profile');
var AuthenticationController = require('./controllers/authentication');
var CharacterController = require('./controllers/character');

module.exports = function(app) {
    
    /*
        Authentication endpoints
    */

    app.get('/api/profile', auth, ProfileController.getProfile);

    app.post('/api/register', function(req, res) {
        AuthenticationController.register(req, res);
    });
    app.post('api/login', function(req, res) {
        AuthenticationController.login(req, res);
    });
    
    app.get('/api/users', function(req, res) {
        UserModel.find(function(err, response) {
            if (err) {
                res.send(err);
            } else {
                res.json(response); 
            }
        })
    });

    app.get('/api/users/:username', function(req, res) {
        var username = req.params.username;
        UserModel.find({ username: username }, function(err, response) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.json(response);
            }
        })
    });

    app.post('/api/users', function(req, res) {
        UserModel.create(req.body, function(err, response) {
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
        UserModel.update(req.body, function(err, response) {
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
        UserModel.deleteOne({ username: username}, function(err, response) {
            if (err){
                console.log(err);
                res.send(err);
            } else {
                res.json(response);
            }
        })
    });


    //  character routes ====================
    //app.get('/api/characters', auth, CharacterController.getCharacters);

    // app.get('/api/getallcharacters', function(req, res) {
    //     CharacterModel.find(function(err, characters) {
    //         if (err) {
    //             console.log(err);
    //             res.status(400).send(err);
    //         } else {
    //             res.status(200).json(characters);
    //         }
    //     });
    // });


    //  frontend routes =====================
    app.get('*', function(req, res) {
        res.sendfile('./public/views/index.html');
    });
}