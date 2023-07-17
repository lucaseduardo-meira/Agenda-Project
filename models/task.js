const mongoose = require("mongoose");

// Models for the task

const TaskSchema = mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String },
});

module.exports = mongoose.model("Task", TaskSchema);

//Task terá titulo, horario e descriçao
