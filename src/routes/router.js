const router = require("express").Router();

const homeController = require("../controller/homeController");
const loginController = require("../controller/loginController");
const { verifyToken, logout } = require("../middleware/middleware");

const services = require("../services/render");

// Index
router.get("/", verifyToken, homeController.showCalendar);
router.post("/", verifyToken, homeController.createTask);
router.put("/", verifyToken, homeController.updateTask);
router.delete("/", verifyToken, homeController.deleteTask);

// Login page

// router.get("/login", logout, services.login);
router.post("/login", loginController.login);

// Register page

// router.get("/register", logout, services.register);
router.post("/register", loginController.createUser);

module.exports = router;
