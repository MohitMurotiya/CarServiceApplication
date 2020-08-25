const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const AccountController = require("../controllers/accountController");

router.patch(
  "/update/:mechId",
  [checkAuth.verifyToken, checkAuth.isMechanic],
  AccountController.updateProfile
);

router.patch(
  "/delete/:mechId",
  [checkAuth.verifyToken, checkAuth.isMechanic],
  AccountController.deleteProfile
);

module.exports = router;
