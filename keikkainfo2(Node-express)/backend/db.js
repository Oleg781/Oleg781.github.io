require('dotenv').config()
const knex = require('knex');
const { DATABASE_OPTIONS } = require('./utils/config');
console.log(DATABASE_OPTIONS);
const db = knex(DATABASE_OPTIONS);

module.exports = db;