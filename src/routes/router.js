const router = require("express").Router();

const homeController = require("../controller/homeController");
const loginController = require("../controller/loginController");
const verifyToken = require("../middleware/middleware");

const services = require("../services/render");

// Login
router.get("/", services.login);
