//  public/js/services/UserService.js

angular.module('UserService', []).factory('User', ['$http', function($http){
    return {
        //call to get all users
        get : function() {
            return $http.get('/api/users');
        },
        create : function(userData) {
            return $http.post('/api/users', userData);
        },
        update : function(id, userData) {
            return $http.delete('/api/users/' + id, userData);
        },
        delete : function(id) {
            return $http.delete('/api/users/' + id);
        }
    }
}])