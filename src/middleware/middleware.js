const jwt = require("jsonwebtoken");
const User = require("../models/user");

const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: "Authorization token required" });
  }

  const token = authorization.split(" ")[1];
  try {
    const { id } = jwt.verify(token, process.env.JWT_SEC);
    req.user = await User.findById(id);
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "request is not authorized" });
  }
};

const logout = (req, res, next) => {
  const token = req.cookies.access_token;
  if (token) {
    res.clearCookie("access_token").status(200);
    console.log("logout");
  }
  return next();
};

module.exports = { verifyToken, logout };
