const usersRoute = require('./routes/users');
const charactersRoute = require('./routes/characters');

module.exports = app => {
    usersRoute(app);
    charactersRoute(app);
};

