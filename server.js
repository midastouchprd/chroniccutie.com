const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const port = 8080;

require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(
  `mongodb+srv://tosin:${process.env.DB_PASS}@chronic-cutie-tasks.nugelp1.mongodb.net/?retryWrites=true&w=majority`
);
const taskSchema = new mongoose.Schema(
  {
    label: String,
    img_src: String,
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Task = new mongoose.model("Task", taskSchema); //  TODO: Fill in arguments!

app.use(express.json());
app.use(express.urlencoded());
app.use("/", express.static(path.join(__dirname, "build")));
app.use(cors());

app.get("/tasks", async (req, res) => {
  let tasks = await Task.find();
  res.send(tasks);
});

app.post("/tasks", async (req, res) => {
  let taskRes = await Task.create(req.body);
  res.send(taskRes);
});

app.patch("/tasks/:id/completed", async (req, res) => {
  await Task.updateOne(
    { _id: req.params.id },
    { completed: req.body.completed }
  );
  let tasks = await Task.find();
  res.send(tasks);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
