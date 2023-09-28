const pg = require("pg");

let config = {};

if (process.env.DATABASE_URL) {
  config = {
    connectionString: process.env.DATABASE_URL,
  };
} else {
  config = {
    database: "weekend-to-do-app",
    host: "localhost",
    port: "5432",
    database: "weekend-to-do-app",
    max: 10,
    idleTimeoutMillis: 30000,
  };
}

const pool = new pg.Pool(config);

pool.on("connect", () => console.log("successfully connected to postgres"));

pool.on("error", (err) => console.log("error in connecting to postgres", err));

module.exports = pool;