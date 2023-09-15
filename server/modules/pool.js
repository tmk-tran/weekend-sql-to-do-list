const pg = require("pg");
const pool = new pg.Pool({
  host: "localhost",
  port: "5432",
  database: "hotel",
  max: 10,
  idleTimeoutMillis: 30000,
});

pool.on("connect", () => console.log("successfully connected to postgres"));

pool.on("error", (err) => console.log("error in connecting to postgres", err));

module.exports = pool;