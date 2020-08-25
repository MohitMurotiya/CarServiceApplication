const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const MechanicController = require("../controllers/mechanicController");

router.get(
  "/findAvailable",
  [checkAuth.verifyToken, checkAuth.isAdmin],
  MechanicController.findAvailable
);

router.get(
  "/findAll",
  [checkAuth.verifyToken, checkAuth.isAdmin],
  MechanicController.findAll
);

module.exports = router;
