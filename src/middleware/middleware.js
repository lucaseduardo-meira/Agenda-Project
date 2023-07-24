const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;

  if (!token) {
    return res.redirect("/login");
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SEC);
    req.user = user;
    return next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = verifyToken;
