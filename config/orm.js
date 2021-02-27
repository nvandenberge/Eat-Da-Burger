// Import MySQL connection
const db = require("../config/connection.js");

// Helper function for SQL syntax
// Loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string
function printQuestionMarks(num) {
    let arr = [];
    for (var i = 0; i < num; i++) {
        arr.push(`?`);
    }
    return arr.toString();
  }

// Object for all our SQL statement functions
const orm = {
  all: (tableInput, cb) => {
    let query = `SELECT * FROM ${tableInput};`;
    db.query(query, (err, result) => {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  create: (tableInput, cols, vals, cb) => {
      let query = `INSERT INTO ${tableInput} (${cols.toString()}) VALUES (${printQuestionMarks(vals.length)})`;
      console.log(query)
      db.query(query, vals, (err, result) => {
        if (err) {
          throw err;
        }
        cb(result);
      });
    }
};

// Export the orm object for the model (burger.js).
module.exports = orm;
