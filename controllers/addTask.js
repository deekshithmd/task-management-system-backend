// module/schema imports
const User = require("../models/userModel");
const Tasks = require("../models/taskModel");

// controller for adding new task
const addTask = async (req, res) => {
  try {
    const { user } = req.params;
    const { userId } = user;
    const data = new Tasks({
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
    });

    const savedData = await User.findByIdAndUpdate(
      { _id: userId },
      { $addToSet: { tasks: data } }
    );
    const updatedData = await User.findById({ _id: userId });
    res.status(201).json(updatedData);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = { addTask };
