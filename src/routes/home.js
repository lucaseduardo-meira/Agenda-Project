const router = require("express").Router();
const Task = require("../src/models/task");
const User = require("../src/models/user");
const verifyToken = require("../middleware/middleware");

// Show the calendar
router.get("/", verifyToken, async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findById(id);
    if (!user) return res.status(500).json("User not found");
    const tasks = await Task.find({ userID: id });
    return res.status(200).json(tasks);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Create a new task

router.post("/", verifyToken, async (req, res) => {
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

router.put("/", verifyToken, async (req, res) => {
  try {
    const id = req.body.userID;
    const user = await User.findById(id);
    if (!user) return res.status(500).json({ error: "User not found" });
    const task = await Task.findByIdAndUpdate(
      req.body.id,
      { $set: req.body },
      { new: true }
    );
    return res.status(200).json(task);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Delete a task

router.delete("/", verifyToken, async (req, res) => {
  try {
    const id = req.body.userID;
    const user = await User.findById(id);
    if (!user) return res.status(500).json({ error: "User not found" });
    const task = await Task.findByIdAndDelete(req.body.id);
    return res.status(200).json(task);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
