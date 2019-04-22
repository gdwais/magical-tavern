const db = require('../db');
const _ = global;

module.exports = (app) => {

    app.get('/api/characters', async (req, res) => {
        _.logMessage(`GET /api/characters`);
        let users = await db.selectQuery(`select * from characters`);
        res.status(200).send(users);
    });

    app.get('/api/character/:id', async (req, res) => {
        _.logMessage(`GET ONE /api/character/${req.params.id}`);
        let users = await db.selectQuery(`select * from characters where character_id = ${req.params.id}`);
        res.status(200).send(users[0]);
    });

    app.post('/api/characters', async (req, res) => {
        _.logMessage(`POST /api/characters`);
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

    app.put('/api/characters/:id', async (req, res) => {
        _.logMessage(`PUT /api/characters/${req.params.id}`);
    });

    app.delete('/api/characters/:id', async   (req, res) => {
        _.logMessage(`DELETE /api/characters/${req.params.id}`);
    });

}
