//  app/routes.js


var User = require('./models/user');

module.exports = function(app) {
    
    
    /*
        USER ENDPOINTS
    */
    var endpoint = '/api/users';
    //GET ALL USERS
    app.get(endpoint, function(req, res) {
        User.find(function(err, response) {
            if (err) {
                res.send(err);
            } else {
                res.json(response); 
            }
        })
    });

    //GET USER BY USERNAME
    app.get(endpoint + '/:username', function(req, res) {
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

    //CREATE NEW USER
    app.post(endpoint, function(req, res) {
        User.create(req.body, function(err, response) {
            if (err) {
                console.log(err);
                res.send(err);
            } else {
                res.json(response);
            }
        });
    });
    
    //CREATE NEW USER
    app.put(endpoint + '/:username', function(req, res) {
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

    //DELETE USER
    app.delete(endpoint + '/:username', function(req, res) {
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