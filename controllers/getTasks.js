// module/schema import
const User = require("../models/userModel");

// controller to get all tasks
const getTasks = async (req, res) => {
  const { user } = req.params;
  try {
    const data = await User.findById({ _id: user?.userId });
    res.status(200).json(data);
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
};

module.exports = { getTasks };
