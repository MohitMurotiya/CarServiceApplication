const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
  name: {
    type: String,
    min: 4,
    max: 20,
  },
  email: {
    type: String,
    unique: true,
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: { type: String },
  role: {
    type: String,
    default: "CUSTOMER",
  },
});

module.exports = mongoose.model("customer", customerSchema);
