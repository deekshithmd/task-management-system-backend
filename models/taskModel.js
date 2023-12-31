// module import
const mongoose = require("mongoose");

// schema for task
const taskSchema = new mongoose.Schema({
  title: {
    required: true,
    type: String,
    default: "Test",
  },
  description: {
    required: true,
    type: String,
    default: "test",
  },
  status: {
    required: true,
    type: String,
    default: "Todo",
  },
});

module.exports = mongoose.model("Task", taskSchema);
