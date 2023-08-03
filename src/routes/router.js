const router = require("express").Router();

const homeController = require("../controller/homeController");
const loginController = require("../controller/loginController");
const { verifyToken, logout } = require("../middleware/middleware");

const services = require("../services/render");

// Index
router.get("/", homeController.showCalendar);
router.post("/", homeController.createTask);
router.put("/", verifyToken, homeController.updateTask);
router.delete("/", verifyToken, homeController.deleteTask);

// Login page

router.get("/login", logout, services.login);
router.post("/login", logout, loginController.login);

// Register page

router.get("/register", logout, services.register);
router.post("/register", logout, loginController.createUser);

module.exports = router;
