// module/schema imports
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// controller to handle login of a user
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await User.findOne({ email });
  } catch (e) {
    const error = new Error("Error in finding the user");
    return next(error);
  }
  if (!existingUser || existingUser?.password !== password) {
    const error = new Error("Please check the entered details again");
    return next(error);
  }
  let token;
  try {
    token = jwt.sign(
      { userId: existingUser.id, email: existingUser.email },
      process.env.SECRET_KEY,
      { expiresIn: "2h" }
    );
  } catch (err) {
    console.log(err);
    const error = new Error("Error in creating token");
    return next(error);
  }

  res.status(200).json({
    user: existingUser,
    token: token,
  });
};

module.exports = { loginUser };
