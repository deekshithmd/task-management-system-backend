// module imports
const mongoose = require("mongoose");
const Task = require("./taskModel").schema;

// schema for user
const userSchema = new mongoose.Schema({
  firstName: {
    required: true,
    type: String,
  },
  lastName: {
    required: true,
    type: String,
  },
  email: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  tasks: [Task],
});

module.exports = mongoose.model("User", userSchema);
