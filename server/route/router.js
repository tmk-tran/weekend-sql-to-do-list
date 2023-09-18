const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");

// Original GET request, modified for reverse params below
// router.get("/", (req, res) => {
//   console.log("Received GET request at /list");
//   const queryText = `SELECT * FROM "list" ORDER BY "id" ASC;`;

//   pool
//     .query(queryText)
//     .then((result) => res.send(result.rows))
//     .catch(() => {
//       console.log("error in GET request");
//       res.sendStatus(500);
//     });
// });

// Updated GET for reverse params
router.get("/", (req, res) => {
  console.log("Received GET request at /list");

  // Check if reverse query param is present
  const reverseOrder = req.query.reverse === "true" ? "DESC" : "ASC";
  console.log(reverseOrder);

  const queryText = `SELECT * FROM "list" ORDER BY "id" ${reverseOrder};`;

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
  const queryText = `INSERT INTO "list" ("task", "description", "priority", "notes")
                            VALUES ($1, $2, $3, $4)`;

if (!list.task || !list.priority) {
    res.sendStatus(400);
    return;
}

  pool
    .query(queryText, [list.task, list.description, list.priority, list.notes])
    .then(() => res.sendStatus(201))
    .catch((err) => {
      console.log("error in POST request", err);
      res.sendStatus(500);
    });
});

// PUT -updated for stretch goal
router.put("/:id", (req, res) => {
    const id = req.params.id;
    const item = req.body;
    console.log(item);
    console.log('UPDATE list in /list with id: ', id);
    const completedDate = item.complete ? new Date() : null; // Add completed date if complete

    const queryText = `UPDATE "list" SET "complete" = $1, "completed_date" = $2 WHERE "id" = $3;`;

    pool
      .query(queryText, [item.complete, completedDate, id])
      .then(() => res.sendStatus(204))
      .catch((err) => {
        console.log("error in PUT", err);
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

module.exports = router;
