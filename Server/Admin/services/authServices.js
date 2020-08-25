const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");

router.post("/login", AuthController.login);

router.post("/register", AuthController.register);

module.exports = router;
