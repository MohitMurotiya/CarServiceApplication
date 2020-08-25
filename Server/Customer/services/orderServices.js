const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const OrderController = require("../controllers/orderController");

router.get(
  "/findOrders/:customerId",
  [checkAuth.verifyToken, checkAuth.isCustomer],
  OrderController.findMyOrders
);

module.exports = router;
