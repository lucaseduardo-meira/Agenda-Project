const CryptoJS = require("crypto-js");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

module.exports = {
  // CREATE A NEW USER
  async createUser(req, res) {
    try {
      const existsUser = await User.findOne({ username: req.body.username });
      if (existsUser) {
        throw Error("Usuário já possui uma conta");
      }
      const exists = await User.findOne({ email: req.body.email });
      if (exists) {
        throw Error("Email já possui uma conta");
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
      const username = req.body.username;
      const user = await User.findOne({ username });

      if (!user) {
        throw Error("Usuário não existe");
      }

      var bytes = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
      const pass = bytes.toString(CryptoJS.enc.Utf8);
      if (pass != req.body.password) {
        throw Error("Senha incorreta");
      }

      const accessToken = jwt.sign({ id: user.id }, process.env.JWT_SEC, {
        expiresIn: "1d",
      });

      return res.status(200).json({ username, accessToken });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
