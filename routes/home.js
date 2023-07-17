const router = require("express").Router();
const task = require("../models/task");
const Task = require("../models/task");
const User = require("../models/user");

module.exports = router;

// Router for the home page
// Show the calendar
router.get("/", async (req, res) => {
  try {
    const id = req.body.userID;
    const user = await User.findById(id);
    if (!user) return res.status(500).json("User not found");
    const tasks = await Task.find({ userID: id });
    return res.status(200).json(tasks);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Create a new task

router.post("/", async (req, res) => {
  try {
    const id = req.body.userID;
    const user = await User.findById(id);
    if (!user) return res.status(500).json({ error: "User not found" });
    const task = await new Task({
      title: req.body.title,
      date: req.body.date,
      description: req.body.description,
      userID: req.body.userID,
    });
    await task.save();
    return res.status(200).json(task);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Update a task

router.put("/", (req, res) => {});

// Delete a task

router.delete("/", (req, res) => {});
