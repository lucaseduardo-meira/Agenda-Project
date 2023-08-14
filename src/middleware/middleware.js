const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.redirect("/login");
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SEC);
    req.user = user;
    console.log("ok");
    return next();
  } catch (error) {
    console.log(error);
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
