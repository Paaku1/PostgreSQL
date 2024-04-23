const { Client } = require('pg');

const client = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: '*Password*',//your postgres password
    database: 'postgres'
});

module.exports = client;
