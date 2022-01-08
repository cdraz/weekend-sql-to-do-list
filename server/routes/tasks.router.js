const express = require('express');
const taskRouter = express.Router();
const pg = require('pg');

// Pool

    // create pool
const pool = new pg.Pool({
    database: 'to_do_app',
    host: 'localhost',
    port: 5432
});

    // log when db connection is successful
pool.on('connect', () => {
    console.log('successfully connected to postgres');
});

    // log if db connection failed
pool.on('error', err => {
    console.log('failed connecting to postgres', err);
});

// GET


// POST


// PUT


// DELETE


module.exports = taskRouter;