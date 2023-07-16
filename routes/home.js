const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).json("Working");
});

module.exports = router;

// Router for the home page
// Show the calendar
router.get("/", (req, res) => {
  res.status(200).json("Working");
});
router.get("/", (req, res) => {
  res.status(200).json("Working");
});

// Create a new task

router.post("/", (req, res) => {});

// Update a task

router.put("/", (req, res) => {});

// Delete a task

router.delete("/", (req, res) => {});
