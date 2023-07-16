const router = require("express").Router();
const CryptoJS = require("crypto-js");
const User = require("../models/user");

router.get("/", (req, res) => {
  return res.status(200).json("Working");
});

// CREATE A NEW USER
router.post("/register", async (req, res) => {
  try {
    const pass = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();

    const user = await new User({
      username: req.body.username,
      password: pass,
      email: req.body.email,
    });
    await user.save();
    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// LOGIN A USER

router.post("/", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) return res.status(500).json("User Dont exist");

    const pass = user.password;
    if (pass != req.body.password) {
      return res.status(500).json("Wrong Password");
    }

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
// Router to login and sign in
