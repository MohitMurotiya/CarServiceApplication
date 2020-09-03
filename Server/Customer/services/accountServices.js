const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const AccountController = require("../controllers/accountController");

router.get(
  "/findAll",
  checkAuth.verifyToken,
  AccountController.getAllCustomers
);

router.get("/findCustById/:custId", AccountController.findCustById);

router.patch(
  "/updateProfile/:custId",
  [checkAuth.verifyToken, checkAuth.isCustomer],
  AccountController.updateProfile
);

router.delete(
  "/deleteAccount/:custId",
  [checkAuth.verifyToken, checkAuth.isCustomer],
  AccountController.deleteCustomer
);

module.exports = router;
