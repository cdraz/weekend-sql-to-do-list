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
taskRouter.get('/', (req, res) => {
    console.log('in GET /tasks');

    let queryText = 'SELECT * FROM "tasks" ORDER BY "id" DESC';
    
    pool.query(queryText).then( result => {
        res.send(result.rows);
    })
        .catch( err => {
            console.log('error getting tasks', err);
            res.sendStatus(500);
        });
}); // end GET endpoint

// POST
taskRouter.post('/', (req, res) => {
    let newTask = req.body;
    console.log('Adding task', newTask);

    // Write SQL query
    let queryText =`
        INSERT INTO "tasks"
            ("description", "complete")
        VALUES ($1, $2);
    `;

    let queryParams = [
        newTask.description,
        newTask.complete
    ];

    pool.query(queryText, queryParams)
        .then( () => {
            res.sendStatus(201);
        })
        .catch( err => {
            console.log('Error adding new task', err );
            res.sendStatus(500);
        });
});

// PUT


// DELETE
module.exports = taskRouter;