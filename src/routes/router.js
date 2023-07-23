const router = require("express").Router();

const homeController = require("../controller/homeController");
const loginController = require("../controller/loginController");
const verifyToken = require("../middleware/middleware");

const services = require("../services/render");

// Index
router.get("/", verifyToken, services.home);
router.post("/", verifyToken, homeController.createTask);
router.put("/", verifyToken, homeController.updateTask);
router.delete("/", verifyToken, homeController.deleteTask);

// Login page

router.get("/login", services.login);
router.post("/login", loginController.login);

// Register page

router.get("/register", services.register);
router.post("/register", loginController.createUser);

module.exports = router;
