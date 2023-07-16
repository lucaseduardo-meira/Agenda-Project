const router = require("express").Router();

router.get("/", (req, res) => {
  res.status(200).json("Working");
});

module.exports = router;
// Router to login and sign in
