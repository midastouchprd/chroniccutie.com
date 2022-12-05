const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;

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

// let tasks = [
//   {
//     id: "48924668-3ae9-4756-9575-62a22062e3c1",
//     label: "Be The Cutest",
//     img_src:
//       "https://38.media.tumblr.com/ecc2be587c506b7dbc98e9298056863a/tumblr_n7054bo2Df1smcbm7o1_500.gif",
//     completed: false,
//   },
//   {
//     id: "0665a9a0-b1fb-4c3f-a0f0-19b0e0621bf2",
//     label: "Schedule EKG",
//     img_src: "https://media.giphy.com/media/34uVCLrYC6vf7FxP2n/giphy.gif",
//     completed: false,
//   },
// ];

app.use(express.json());
app.use(express.urlencoded());
app.use("/", express.static(path.join(__dirname, "build")));
app.use(cors());

app.get("/api/tasks", async (req, res) => {
  let tasks = await Task.find();
  console.logs(tasks);
  res.json(tasks);
});

app.post("/api//tasks", async (req, res) => {
  let taskRes = await Task.create(req.body);
  res.json(taskRes);
});

app.patch("/api//tasks/:id/completed", async (req, res) => {
  console.log(req.body, req.params);
  let taskRes = await Task.updateOne(
    { _id: req.params.id },
    { completed: req.body.completed }
  );
  console.log(taskRes);
  let tasks = await Task.find();
  console.log(tasks);
  res.json(taskRes);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
