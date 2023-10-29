// module/schema imports
const mongoose = require("mongoose");
const User = require("../models/userModel");

// controller for deleting selected task
const deleteTask = async (req, res) => {
  try {
    const { id, user } = req.params;
    const { userId } = user;

    if (!mongoose.Types.ObjectId.isValid(id))
      res.status(404).json({ msg: `No task with id :${id}` });

    const deletedData = await User.findOneAndUpdate(
      { _id: userId },
      { $pull: { tasks: { _id: id } } }
    );

    const updatedData = await User.findById({ _id: userId });

    res.status(200).json(updatedData);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = { deleteTask };
