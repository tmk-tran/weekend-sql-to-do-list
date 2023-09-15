const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

router.get("/", (req, res) => {
  console.log("Received GET request at /list");
  const queryText = `SELECT * FROM "list" ORDER BY "id" ASC;`;

  pool
    .query(queryText)
    .then((result) => res.send(result.rows))
    .catch(() => {
      console.log("error in GET request");
      res.sendStatus(500);
    });

router.post("/", (req, res) => {
    const list = req.body;
    console.log("POST request", list);
    const queryText = `INSERT INTO "list" ("task", "priority")
                        VALUES ($1, $2)`;
                        
    pool
    .query(queryText, [
        list.task,
        list.priority
    ])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log("error in POST request", err);
      res.sendStatus(500);
    })

});

module.exports = router;