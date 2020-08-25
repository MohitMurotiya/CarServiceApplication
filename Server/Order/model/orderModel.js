const mongoose = require("mongoose");

const orderSchema = mongoose.Schema({
  customerId: { type: String },
  carId: { type: String },
  carNumber: { type: String },
  custAddress: { type: String, max: 40 },
  serviceId: { type: String },
  mechanicId: { type: String },
  requestedOn: { type: Date, default: Date.now() },
  deliveredOn: { type: Date },
  status: {
    type: String,
    default: "PLACED",
  },
});

module.exports = mongoose.model("order", orderSchema);
