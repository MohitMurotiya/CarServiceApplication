const OrderModel = require("../model/orderModel");
const MemberModel = require("../model/memberModel");
const CustomerModel = require("../model/customerModel");

//Find Placed Orders
exports.findPlacedOrders = (req, res) => {
  OrderModel.find({ status: "PLACED" })
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
      console.log("Find All Placed Orders Error: " + err);
      res.status(500).json({
        error: err,
      });
    });
};

//Send Order to Mechanic
exports.updateOrder = (req, res) => {
  const orderId = req.params.orderId;
  //updateOne({ _id: id }, { $set: req.body }
  OrderModel.updateOne(
    { _id: orderId },
    { $set: { status: "IN-PROCESS", mechanicId: req.body.mechanicId } }
  )
    .exec()
    .then((response) => {
      res.status(200).json({
        message: "Order Successfully Assign to Mechanic",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
