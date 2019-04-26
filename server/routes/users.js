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
        try {
            let users = await db.selectQuery('users', undefined, { user_id: req.params.id });
            res.status(200).send(users[0]);
        } catch (err) {
            res.status(500).send(`an error occured :: ${err}`);
        }
    });

    app.post('/api/users', async (req, res) => {
        _.logMessage(`POST /api/users`);
        if (req.body) {
            try {
                let newUser = await db.insertQuery('users', req.body);
                res.status(200).send(newUser);
            } catch (err) {
                _.logMessage(`something failed on the insert :: ${err}`);
                res.status(500).send(`an error occured :: ${err}`);
            }
        } else {
            res.status(500).send(`no request body found`);
        }
    });

    app.put('/api/user/:id', async (req, res) => {
        _.logMessage(`PUT /api/user/${req.params.id}`);
        let payload = req.body;
        if (payload) {  
            payload.updated_date = new Date();
            let updatedUser = await db.updateQuery('users', { user_id: req.params.id }, req.body);
            res.status(200).send(updatedUser)
        } else {
            res.status(500).send(`no request body found`);
        }
    });

    app.delete('/api/users/:id', async   (req, res) => {
        _.logMessage(`DELETE /api/users/${req.params.id}`);
        try {
            let users = await db.deleteQuery('users', { user_id: req.params.id });
            res.status(200).send(users[0]);
        } catch (err) {
            res.status(500).send(`an error occured :: ${err}`);
        }
    });

}
