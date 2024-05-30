const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  productType: {
    type: String,
    max: 15,
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  price: {
    type: Number,
    required: true,
    max: 50000,
  },
  description: {
    type: String,
    required: true,
    max: 30,
  }
});

module.exports = mongoose.model("products", productSchema);
