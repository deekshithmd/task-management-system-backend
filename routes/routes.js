// module imports
const express = require("express");
const { validateToken } = require("../utils/validateToken");
const { loginUser } = require("../controllers/login");
const { signupUser } = require("../controllers/signup");
const { getTasks } = require("../controllers/getTasks");
const { addTask } = require("../controllers/addTask");
const { deleteTask } = require("../controllers/deleteTask");
const { updateTask } = require("../controllers/updateTask");

const router = express.Router();

module.exports = router;

// signup user route
router.post("/signup", signupUser);

// login user route
router.post("/login", loginUser);

// get all tasks of particular  user route
router.get("/tasks", validateToken, getTasks);

// new task adding route
router.post("/tasks", validateToken, addTask);

// task deleting route
router.delete("/tasks/:id", validateToken, deleteTask);

// task updating route
router.put("/tasks/:id", validateToken, updateTask);
