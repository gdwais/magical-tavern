const db = require('../db');
const _ = global;

module.exports = (app) => {

    app.get('/api/characters', async (req, res) => {
        _.logMessage(`GET /api/characters`);
        let characters = await db.selectQuery('characters');
        res.status(200).send(characters);
    });

    app.get('/api/characters/:id', async (req, res) => {
        _.logMessage(`GET ONE /api/characters/${req.params.id}`);
        let characters = await db.selectQuery('characters', undefined, { character_id: req.params.id });
        res.status(200).send(characters[0]);
    });

    app.get('/api/characters/user/:id', async (req, res) => {
        _.logMessage(`GET /api/characters/user/${req.params.id}`);
        let characters = await db.selectQuery('characters', undefined, { user_id: req.params.id });
        res.status(200).send(characters);
    });

    app.post('/api/characters', async (req, res) => {
        _.logMessage(`POST /api/characters`);
        let payload = req.body;
        if (payload) {
            try {
                let newCharacter = await db.insertQuery('characters', payload);
                res.status(200).send(newCharacter);
            } catch(err) {
                _.logMessage(`an error occured during insert :: ${err}`);
                res.status(500).send(err);
            }
        } else {
            res.status(500).send(`no request body found`);
        }
    });

    app.put('/api/characters/:id', async (req, res) => {
        _.logMessage(`PUT /api/characters/${req.params.id}`);
        let payload = req.body;
        if (payload) {  
            payload.updated_date = new Date();
            let updatedCharacter = await db.updateQuery('characters', { character_id: req.params.id }, payload);
            res.status(200).send(updatedCharacter);
        } else {
            res.status(500).send(`no request body found`);
        }

    });

    app.delete('/api/characters/:id', async (req, res) => {
        _.logMessage(`DELETE /api/characters/${req.params.id}`);
        try {
            let result = await db.deleteQuery('characters', { character_id: req.params.id });
            res.status(200).send(result);
        } catch (err) {
            res.status(500).send(`an error occured :: ${err}`);
        }
    });

}
