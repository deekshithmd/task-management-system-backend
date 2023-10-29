require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const routes = require("./routes/routes");

const db_url = process.env.DATABASE_URL;

const app = express();
app.use(cors());

mongoose.connect(db_url);

const database = mongoose.connection;

database.on("error", () => console.log("Error in connecting"));
database.on("connected", () => console.log("Database connected"));

app.use(express.json());
app.use("/api", routes);

app.listen(8000, () => console.log("listening"));

module.exports = app;
