const Order = require("../model/orderModel");

//Find My Orders
exports.findMyOrders = (req, res) => {
  Order.find({ customerId: req.params.customerId })
    .exec()
    .then((response) => {
      if (response.length == 0) {
        res.status(200).json({
          message: "No Orders",
        });
      } else {
        res.status(200).json({
          orders: response,
        });
      }
    })
    .catch((err) => {
      console.log("Find My Orders Error: " + err);
      res.status(500).json({
        error: err,
      });
    });
};
