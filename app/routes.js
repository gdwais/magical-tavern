//  app/routes.js


var User = require('./models/user');

module.exports = function(app) {
    
    var endpoint = '/api/users';
    
    app.get(endpoint, function(req, res) {
        User.find(function(err, users) {
            if (err) {
                res.send(err);
            } else {
                res.json(users); 
            }
        })
    });
    app.post(endpoint, function(req, res) {
        
    });
    app.delete(endpoint, function(req, res) {

    });
    //  frontend routes =====================
    app.get('*', function(req, res) {
        res.sendfile('./public/views/index.html');
    });
}