const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const AccountController = require("../controllers/accountController");

router.patch(
  "/update/:mechId",
  [checkAuth.verifyToken],
  AccountController.updateProfile
);

router.delete(
  "/delete/:mechId",
  [checkAuth.verifyToken],
  AccountController.deleteProfile
);

module.exports = router;
