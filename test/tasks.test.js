const request = require("supertest");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const app = require("../index");
const User = require("../models/userModel");

describe("Testing signup, login, add, delete and update endpoints", () => {
  beforeEach(async () => {
    await User.deleteMany();
  });

  test("Should signup a new user", async () => {
    const response = await request(app)
      .post("/api/signup")
      .send({
        firstName: "Test",
        lastName: "M D",
        email: "test@test.com",
        password: "1234567890",
        tasks: [],
      })
      .expect(201);

    // to test database changed correctly
    const user = await User.findById(response.body._id);

    // testing response and signup data matching
    expect(user.password).toBe("1234567890");
  }, 30000);

  test("Should signup and login a user", async () => {
    const signupResponse = await request(app)
      .post("/api/signup")
      .send({
        firstName: "Test",
        lastName: "M D",
        email: "test@test.com",
        password: "1234567890",
        tasks: [],
      })
      .expect(201);

    const loginResponse = await request(app)
      .post("/api/login")
      .send({
        email: "test@test.com",
        password: "1234567890",
      })
      .expect(200);

    // Checking whether the user's name is same as signup
    expect(loginResponse.body.user.firstName).toBe("Test");
  }, 30000);

  test("Should signup, login and add a task", async () => {
    const signupResponse = await request(app)
      .post("/api/signup")
      .send({
        firstName: "Test",
        lastName: "M D",
        email: "test@test.com",
        password: "1234567890",
        tasks: [],
      })
      .expect(201);

    const loginResponse = await request(app)
      .post("/api/login")
      .send({
        email: "test@test.com",
        password: "1234567890",
      })
      .expect(200);

    // api call for adding task
    const addTaskResponse = await request(app)
      .post("/api/tasks")
      .set("Authorization", loginResponse.body.token)
      .send({
        title: "First",
        description: "first task",
        status: "todo",
      })
      .expect(201);
    // testing whether added task exists
    expect(addTaskResponse?.body?.tasks[0]?.title).toBe("First");
  }, 30000);

  test("Should signup, login , add a task and get all tasks and check length", async () => {
    const signupResponse = await request(app)
      .post("/api/signup")
      .send({
        firstName: "Test",
        lastName: "M D",
        email: "test@test.com",
        password: "1234567890",
        tasks: [],
      })
      .expect(201);

    const loginResponse = await request(app)
      .post("/api/login")
      .send({
        email: "test@test.com",
        password: "1234567890",
      })
      .expect(200);

    // api call for adding task
    const addTaskResponse = await request(app)
      .post("/api/tasks")
      .set("Authorization", loginResponse.body.token)
      .send({
        title: "First",
        description: "first task",
        status: "todo",
      })
      .expect(201);

    // api call to get all tasks
    const getTasksResponse = await request(app)
      .get("/api/tasks")
      .set("Authorization", loginResponse.body.token)
      .expect(200);

    // testing whether getting all added tasks
    expect(getTasksResponse?.body?.tasks?.length).toBe(1);
  }, 30000);

  test("Should signup, login , add a task and delete the task", async () => {
    const signupResponse = await request(app)
      .post("/api/signup")
      .send({
        firstName: "Test",
        lastName: "M D",
        email: "test@test.com",
        password: "1234567890",
        tasks: [],
      })
      .expect(201);

    const loginResponse = await request(app)
      .post("/api/login")
      .send({
        email: "test@test.com",
        password: "1234567890",
      })
      .expect(200);

    // api call for adding task
    const addTaskResponse = await request(app)
      .post("/api/tasks")
      .set("Authorization", loginResponse.body.token)
      .send({
        title: "First",
        description: "first task",
        status: "todo",
      })
      .expect(201);

    // api call to delete added task
    const deleteTasksResponse = await request(app)
      .delete(`/api/tasks/${addTaskResponse?.body?.tasks[0]?._id}`)
      .set("Authorization", loginResponse.body.token)
      .expect(200);

    // testing whether added task is deleted or not
    expect(deleteTasksResponse?.body?.tasks?.length).toBe(0);
  }, 30000);

  test("Should signup, login , add a task and update the task", async () => {
    const signupResponse = await request(app)
      .post("/api/signup")
      .send({
        firstName: "Test",
        lastName: "M D",
        email: "test@test.com",
        password: "1234567890",
        tasks: [],
      })
      .expect(201);

    const loginResponse = await request(app)
      .post("/api/login")
      .send({
        email: "test@test.com",
        password: "1234567890",
      })
      .expect(200);

    // api call for adding task
    const addTaskResponse = await request(app)
      .post("/api/tasks")
      .set("Authorization", loginResponse.body.token)
      .send({
        title: "First",
        description: "first task",
        status: "todo",
      })
      .expect(201);

    // api call to update the added task
    const updateTasksResponse = await request(app)
      .put(`/api/tasks/${addTaskResponse?.body?.tasks[0]?._id}`)
      .set("Authorization", loginResponse.body.token)
      .send({
        title: "First",
        description: "first task",
        status: "inprogress",
      })
      .expect(200);

    // testing whether task is updated or not
    expect(updateTasksResponse?.body?.tasks[0]?.status).toBe("inprogress");
  }, 30000);
});
