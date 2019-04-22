const { Pool, Client } = require('pg');
const config = require('../config/default');
const pool = new Pool(config.postgres)
const _ = global;

let selectQuery = async sql => {
    try {
        const result = await pool.query(sql);
        return result.rows;
    } catch(err) {
        _.logMessage(`an error occurred :: ${err}`);
    }
};

let insertQuery = async (table, queryObj) => {
    try {
        const queryText = formatInsertQuery(table, Object.keys(queryObj));
        const result = await pool.query({ text: queryText, values: Object.values(queryObj) });
        return result.rows;
    } catch (err) {
        _.logMessage(`an error occurred while inserting :: ${err}`);
    }
}

let formatInsertQuery = (table, keys) => {
    const paramKeys = Object.keys(keys).map(i => `$${++i}`);
    return `INSERT INTO ${table} (${ keys.join()}) VALUES(${paramKeys.join()}) RETURNING *`;
} 

module.exports = {
    selectQuery: selectQuery,
    insertQuery: insertQuery
}