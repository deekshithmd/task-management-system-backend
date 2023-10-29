// module/schema imports
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// controller for handling signup of new user
const signupUser = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  const newUser = new User({ firstName, lastName, email, password, tasks: [] });

  try {
    await newUser.save();
  } catch {
    const error = new Error("Error in creating new user");
    return next(error);
  }
  let token;
  try {
    token = jwt.sign(
      { userId: newUser.id, email: newUser.email },
      process.env.SECRET_KEY,
      { expiresIn: "24h" }
    );
  } catch (err) {
    const error = new Error("Error in creating token");
    return next(error);
  }
  res.status(201).json({
    _id: newUser?._id,
    firstName: newUser?.firstName,
    lastName: newUser?.lastName,
    email: newUser?.email,
    token,
  });
};

module.exports = { signupUser };
