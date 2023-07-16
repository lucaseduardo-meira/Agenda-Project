const router = require("express").Router();
const User = require("../models/user");

router.get("/", (req, res) => {
  return res.status(200).json("Working");
});

router.post("/register", async (req, res) => {
  try {
    const user = await new User({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
    });
    await user.save();
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

router.post("login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(500).json("User Dont exist");
  } catch (err) {}
});

module.exports = router;
// Router to login and sign in
