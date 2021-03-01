// Import MySQL connection
const db = require("../config/connection.js");

// Helper function for SQL syntax
// Loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string
const printQuestionMarks = (num) => {
    let arr = [];
    for (let i = 0; i < num; i++) {
        arr.push(`?`);
    }
    return arr.toString();
  }

  const objToSql = (obj) => {
    let arr = [];
  
    // Loop through the keys and push the key/value as a string int arr
    for (let key in obj) {
      let value = obj[key];
      // Check to skip hidden properties
      if (Object.hasOwnProperty.call(obj, key)) {
        // If string with spaces, add quotations
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {devoured: true} => ["devoured=true"]
        arr.push(key + "=" + value);
      }
    }
    // Translate array of strings to a single comma-separated string
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
    },

    update: (tableInput, objColVals, condition, cb) => {
       let query = `UPDATE ${tableInput} SET ${objToSql(objColVals)} WHERE ${condition}`;
       db.query(query, (err, result) => {
        if (err) {
          throw err;
        }
        cb(result);
      });
    },

    delete: (tableInput, condition, cb) => {
      let query = `DELETE FROM ${tableInput} WHERE ${condition}`;
      db.query(query, (err, result) => {
        if (err) {
          throw err;
        }
        cb(result);
      });
    }
};

// Export the orm object for the model (burger.js).
module.exports = orm;
