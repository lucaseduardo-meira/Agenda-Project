const CryptoJS = require("crypto-js");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports = {
  // CREATE A NEW USER
  async createUser(req, res) {
    try {
      const exists = await User.findOne({ email: req.body.email });

      if (exists) {
        throw Error("Email already in use");
      }

      const pass = CryptoJS.AES.encrypt(
        req.body.password,
        process.env.PASS_SEC
      ).toString();

      const user = new User({
        username: req.body.username,
        password: pass,
        email: req.body.email,
      });

      const newUser = await user.save();

      const accessToken = jwt.sign({ id: newUser.id }, process.env.JWT_SEC, {
        expiresIn: "1d",
      });

      const username = newUser._doc.username;

      return res.status(200).json({ username, accessToken });
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message });
    }
  },

  // LOGIN A USER

  async login(req, res) {
    try {
      const user = await User.findOne({ username: req.body.username });

      if (!user) return res.status(500).json({ message: "error" });

      var bytes = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
      const pass = bytes.toString(CryptoJS.enc.Utf8);
      if (pass != req.body.password) {
        return res.status(500).json("Wrong Password");
      }

      const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SEC, {
        expiresIn: "1d",
      });

      const { password, ...others } = user._doc;

      return res
        .cookie("access_token", accessToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json("ok");
    } catch (err) {
      return res.status(500).json(err);
    }
  },
};
