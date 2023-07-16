const router = require("express").Router();
const User = require("../models/user");

router.get("/", (req, res) => {
  res.status(200).json("Working");
});

router.post("/register", async (req, res) => {
  try {
    const user = await new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    });
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
// Router to login and sign in
