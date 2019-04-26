const { Pool, Client } = require('pg');
const config = require('../config/default');
const pool = new Pool(config.postgres)
const _ = global;

let selectQuery = async (table, what, where) => {
    try {
        const queryText = formatSelectQuery(table, what, where);
        const result = await pool.query(queryText);
        return result.rows;
    } catch (err) {
        _.logMessage(`an error occurred while selecting :: ${err}`);
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
};

let updateQuery = async (table, where, queryObj) => {
    try {
        const queryText = formatUpdateQuery(table, where, Object.keys(queryObj));
        debugger;
        const result = await pool.query({ text: queryText, values: Object.values(queryObj) });
        return result.rows;
    } catch (err) {
        _.logMessage(`an error occured while updating :: ${err}`);
    }
};

let deleteQuery = async (table, queryObj) => {
    try {
        const queryText = formatDeleteQuery(table, Object.keys(queryObj));
        const result = await pool.query({ text: queryText, values: Object.values(queryObj) });
        return result.rows;
    } catch (err) {
        _.logMessage(`an error occured while deleting :: ${err}`);
    }
}

let formatSelectQuery = (table, what, where) => {
    const selectWhat = what ? what.join() : `*`;
    const whereArray = where ? Object.keys(where).map((k) => { return `${k} = ${where[k]}` }) : undefined;
    const selectWhere = whereArray ? `WHERE ${whereArray.join(` AND `)}` : ``;
    const queryText = `SELECT ${selectWhat} FROM ${table} ${selectWhere}`;
    return queryText;
};

let formatInsertQuery = (table, keys) => {
    const paramKeys = Object.keys(keys).map(i => `$${++i}`);
    return `INSERT INTO ${table} (${ keys.join()}) VALUES(${paramKeys.join()}) RETURNING *`;
};

let formatUpdateQuery = (table, where, keys) => {
    debugger;
    const paramKeys = Object.keys(keys).map(i => `${keys[i]} = $${++i}`);
    const whereArray = where ? Object.keys(where).map((k) => { return `${k} = ${where[k]}` }) : undefined;
    const insertWhere = whereArray ? `WHERE ${whereArray.join(` AND `)}` : ``;
    return `UPDATE ${table} SET ${ paramKeys.join()} ${insertWhere}  RETURNING *`;
};

let formatDeleteQuery = (table, keys) => {
    const paramKeys = Object.keys(keys).map(i => `${keys[i]} = $${++i}`);
    return `DELETE FROM ${table} WHERE ${ paramKeys.join(` AND `)}`;
};

module.exports = {
    selectQuery: selectQuery,
    insertQuery: insertQuery,
    updateQuery: updateQuery,
    deleteQuery: deleteQuery
}