const Task = require("../models/task");
const User = require("../models/user");

module.exports = {
  // Show the calendar
  async showCalendar(req, res) {
    try {
      const id = req.user.id;
      const user = await User.findById(id);
      if (!user) return res.status(500).json("User not found");
      const tasks = await Task.find({ userID: id });
      return res.status(200).json(tasks);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // Create a new task

  async createTask(req, res) {
    try {
      const event = req.body;
      const id = req.user.id;
      const user = await User.findById(id);
      if (!user) return res.status(500).json({ error: "User not found" });
      const task = await new Task({
        title: event.title,
        date: event.date,
        description: event.description,
        label: event.label,
        userID: id,
      });
      await task.save();
      return res.status(200).json(task);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Update a task

  async updateTask(req, res) {
    try {
      const event = req.body;
      const id = req.user.id;
      const user = await User.findById(id);
      if (!user) return res.status(500).json({ error: "User not found" });
      const task = await Task.findByIdAndUpdate(
        event._id,
        { $set: event },
        { new: true }
      );
      return res.status(200).json(task);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  // Delete a task

  async deleteTask(req, res) {
    try {
      const id = req.user.id;
      const event = req.body._id;
      const user = await User.findById(id);
      if (!user) return res.status(500).json({ error: "User not found" });
      const task = await Task.findByIdAndDelete(event);
      return res.status(200).json(task);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
