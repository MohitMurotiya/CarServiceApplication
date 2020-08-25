const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const OrderController = require("../controllers/orderController");

router.patch(
  "/updateOrder/:orderId",
  [checkAuth.verifyToken, checkAuth.isMechanic],
  OrderController.updateOrder
);

router.get(
  "/findInProcessOrders/:mechId",
  [checkAuth.verifyToken, checkAuth.isMechanic],
  OrderController.findInProcessOrders
);

router.patch(
  "/findMyOrders/:mechId",
  [checkAuth.verifyToken, checkAuth.isMechanic],
  OrderController.findMyOrders
);

module.exports = router;
