const db = require('../db');
const _ = global;

module.exports = (app) => {

    app.get('/api/users', async (req, res) => {
        _.logMessage(`GET /api/users`);
        let users = await db.selectQuery('users');
        res.status(200).send(users);
    });

    app.get('/api/user/:id', async (req, res) => {
        _.logMessage(`GET ONE /api/user/${req.params.id}`);
        let users = await db.selectQuery('users', undefined, { user_id: req.params.id });
        res.status(200).send(users[0]);
    });

    app.post('/api/users', async (req, res) => {
        _.logMessage(`POST /api/users`);
        if (req.body) {
            try {
                let newUser = await db.insertQuery('users', req.body);
                res.status(200).send(newUser);
            } catch(err) {
                _.logMessage(`something failed on the insert`);
                res.status(500).send();
            }
        } else {
            res.status(500).send(`no request body found`);
        }
    });

    app.put('/api/users/:id', async (req, res) => {
        _.logMessage(`PUT /api/users/${req.params.id}`);
        if (req.body) {
            let updatedUser = db.updateQuery('users', { user_id: req.params.id }, req.body);
        } else {
            res.status(500).send(`no request body found`);
        }
    });

    app.delete('/api/users/:id', async   (req, res) => {
        _.logMessage(`DELETE /api/users/${req.params.id}`);
    });

}
