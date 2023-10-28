require("dotenv").config();
const express = require("express");
const Tasks = require("../models/taskModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const router = express.Router();

module.exports = router;

const validateToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (token == null) res.status(400).json({ message: "Token not present" });
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) {
      res.status(403).send("Token invalid");
    } else {
      req.params.user = user;
      next(); //proceed to the next action in the calling function
    }
  });
};

router.post("/login", async (req, res, next) => {
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
});

router.post("/signup", async (req, res, next) => {
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
    firstName: newUser?.firstName,
    lastName: newUser?.lastName,
    email: newUser?.email,
    token,
  });
});

router.get("/tasks", validateToken, async (req, res) => {
  const { user } = req.params;
  try {
    const data = await User.findById({ _id: user?.userId });
    res.status(200).json(data);
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
});

router.post("/tasks", validateToken, async (req, res) => {
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
});

router.delete("/tasks/:id", validateToken, async (req, res) => {
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
});

router.put("/tasks/:id", validateToken, async (req, res) => {
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
});
