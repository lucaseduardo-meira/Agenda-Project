const router = require("express").Router();
const Task = require("../models/task");

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
    const task = await new Task({
      title: req.body.title,
      date: req.body.date,
      description: req.body.description,
    });
  } catch (err) {}
});

// Update a task

router.put("/", (req, res) => {});

// Delete a task

router.delete("/", (req, res) => {});
