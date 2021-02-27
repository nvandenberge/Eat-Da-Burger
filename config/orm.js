// Import MySQL connection
const db = require("../config/connection.js");

// Object for all our SQL statement functions
const orm = {
  all: (tableInput, cb) => {
    let query = "SELECT * FROM " + tableInput + ";";
    db.query(query, (err, result) => {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
};

// Export the orm object for the model (burger.js).
module.exports = orm;
