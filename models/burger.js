// Import the ORM to create functions that will interact with the database
const orm = require("../config/orm.js");

const burger = {
  all: (cb) => {
    orm.all("burgers", (res) => {
      cb(res);
    });
  },
};

// Export the database functions for the controller (burgers_controller.js).
module.exports = burger;
