const router = require("express").Router();
const Task = require("../models/task");
const User = require("../models/user");

router.get("/", (req, res) => {
  res.status(200).json("Working");
});

module.exports = router;

// Router for the home page
// Show the calendar
router.get("/", (req, res) => {
  res.status(200).json("Working");
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
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Update a task

router.put("/", (req, res) => {});

// Delete a task

router.delete("/", (req, res) => {});
