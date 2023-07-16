const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, require: true },
    email: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

modules.exports = mongoose.model("User", UserSchema);

// models for user
