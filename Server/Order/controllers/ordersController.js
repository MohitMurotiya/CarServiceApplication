const Order = require("../model/orderModel");

//TO place an Order
exports.addOrder = (req, res) => {
  const order = new Order({
    customerId: req.body.customerId,
    customerName: req.body.customerName,
    carName: req.body.carName,
    carNumber: req.body.carNumber,
    custAddress: req.body.custAddress,
    serviceName: req.body.serviceName,
    servicePrice: req.body.servicePrice,
  });
  order
    .save()
    .then((result) => {
      console.log("Order Placed: " + result);
      res.status(201).json({
        message: "Order Succesfully Placed",
        result,
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
        res.status(200).json({
          orders: response,
        });
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
