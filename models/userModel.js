const mongoose = require("mongoose");

// const taskSchema = new mongoose.Schema({
//   title: {
//     required: true,
//     type: String,
//   },
//   description: {
//     required: true,
//     type: String,
//   },
//   status: {
//     required: true,
//     type: String,
//   },
// });

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
  //   tasks: [taskSchema],
});

module.exports = mongoose.model("User", userSchema);
