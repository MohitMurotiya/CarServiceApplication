const Order = require("../model/orderModel");

//TO place an Order
exports.addOrder = (req, res) => {
  const order = new Order({
    customerId: req.body.customerId,
    carId: req.body.carId,
    carNumber: req.body.carNumber,
    custAddress: req.body.custAddress,
    serviceId: req.body.serviceId,
    washerId: req.body.washerId,
  });
  order
    .save()
    .then((result) => {
      console.log("Order Placed: " + result);
      res.status(201).json({
        message: "Order Succesfully Placed",
        yourOrder: result,
      });
    })
    .catch((err) => {
      console.log("Placing Order Error" + err);
      res.status(500).json({
        error: err,
      });
    });
};

//Find Completed Orders
exports.findCompltedOrders = (req, res) => {
  Order.find({ status: "COMPLETED" })
    .exec()
    .then((response) => {
      if (response.length == 0) {
        res.status(200).json({
          message: "No Orders are available",
        });
      } else {
        res.send(response);
      }
    })
    .catch((err) => {
      console.log("Find All Completed Orders Error: " + err);
      res.status(500).json({
        error: err,
      });
    });
};

// "Request Placed",
//           "Request Cancel",
//           "Request in Process",
//           "Request Accepted",
//           "Request Rejected",
//           "Request Completed",
