require('dotenv').config()
import pgPromise from 'pg-promise';

const pgp = pgPromise({}); // Empty object means no additional config required

const config = {
    user: "general_witcher",
    password: "general_witcher",
    host: "127.0.0.1",
    port: 5432,
    database: "witcher_3_helper"
};

const db = pgp(config);

module.exports = db;
