const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

// GET
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
});

// POST
router.post("/", (req, res) => {
  const list = req.body;
  console.log("POST request at /list/ with data of", list);
  const queryText = `INSERT INTO "list" ("task", "priority")
                            VALUES ($1, $2)`;

if (!list.task || !list.priority) {
    res.sendStatus(400);
    return;
}

  pool
    .query(queryText, [list.task, list.priority])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log("error in POST request", err);
      res.sendStatus(500);
    });
});

// DELETE 
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    console.log("DELETE requests at /list/ with id of", id);
    const queryText = `DELETE FROM "list" WHERE "id" = $1;`;
  
    if (!id) {
      res.sendStatus(400);
      return;
    }
  
    pool
      .query(queryText, [id])
      .then(() => res.sendStatus(204))
      .catch((err) => {
        console.log("error in DELETing item from list table", err);
        res.sendStatus(500);
      });
});

// PUT
router.put("/:id", (req, res) => {
    const id = req.params.id;
    const item = req.body;
    console.log(item);
    console.log('UPDATE list in /list with id: ', id);
    queryText = `UPDATE "list" SET "complete" = $1 WHERE "id" = $2;`;
  
    pool
      .query(queryText, [item.complete, id])
      .then(() => res.sendStatus(204))
      .catch((err) => {
        console.log("error in PUT", err);
        res.sendStatus(500);
      });
  });

module.exports = router;
