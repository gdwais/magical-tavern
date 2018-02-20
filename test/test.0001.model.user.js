var assert = require('assert');
var UserModel = require('../app/models/user');

var data = {};
data.email = 'test@test.com';
data.name = 'Test User Guy';

describe('UserModel', function() {
    describe('#create()', function() {
        it('create a user doc successfully', function() {
            UserModel.create(data, function(err, response) {
                debugger;
                if (err) {
                    console.log(err);
                    assert.equal(false);
                } else {
                    debugger;
                    var newUser = response;
                    assert.equal(true);
                }
            });
        });
    });

    describe('#find()', function() {
        it('find a user record successfully', function() {
                
            assert.equal(true);
        });
    });
    
    describe('#update()', function() {
        it('updates a user successfully', function() {
            
            assert.equal(true);
        });
    });

    describe('#setPassword()', function() {
        it('tests userSchema.setPassword', function() {
                
            assert.equal(true);
        });
    });

    describe('#getjWebToken()', function() {
        it('gets the jWebToken successfully', function() {
            assert.equal(true);
        });
    });
});

