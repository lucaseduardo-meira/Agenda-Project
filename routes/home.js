const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).json("Working");
});

module.exports = router;

// Router for the home page
// Show the calendar
// Create a new task
// Update a task
// Delete a task
