const express = require("express");
const router = express.Router();

// Import the model (burger.js) to use its database functions
const burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required
router.get("/", (req, res) => {
  burger.selectAll((data) => {
    let hbsObject = {
      burgers: data,
    };
    // console.log(hbsObject)
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", (req, res) => {
  burger.insertOne([
    "burger_name", "devoured"
  ], [
    req.body.burger_name, req.body.devoured
  ], (result) => {
    res.json({id: result.insertId})
  });
});

router.put("/api/burgers/:id", (req, res) => {
  let condition = `id = ${req.params.id}`;
  burger.updateOne({
    devoured: req.body.devoured
  }, condition, (result) => {
    if (result.changedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
  }
  });
});

// Export routes for server.js to use
module.exports = router;
