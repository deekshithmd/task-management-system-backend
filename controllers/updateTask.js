// module/schema import
const User = require("../models/userModel");

// controller for updating a task
const updateTask = async (req, res) => {
  try {
    const { id, user } = req.params;
    const { userId } = user;
    const dataToUpdate = {
      title: req.body.title,
      description: req.body.description,
      status: req.body.status,
    };

    const userAccount = await User.findById({ _id: userId });

    const taskToUpdate = userAccount?.tasks?.find(
      (task) => task?._id?.toString() === id
    );
    taskToUpdate.set(dataToUpdate);

    const updatedData = await userAccount?.save();

    const data = await User.findById({ _id: userId });

    res.status(200).json(data);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

module.exports = { updateTask };
