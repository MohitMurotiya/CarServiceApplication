const Customer = require("../model/customerModel");

exports.updateProfile = (req, res) => {
  const id = req.params.custId;
  Customer.updateOne({ _id: id }, { $set: req.body })
    .exec()
    .then((response) => {
      console.log("Profile Updated Successfully: " + response);
      res.status(200).json({
        message: " Profile Updated Successfully",
        response,
      });
    })
    .catch((err) => {
      console.log("Profile Update error: " + err);
      res.status(500).json({ "Profile Update error ": err });
    });
};

exports.getAllCustomers = (req, res) => {
  Customer.find()
    .select("name email _id")
    .exec()
    .then((results) => {
      const response = {
        count: results.length,
        products: results.map((result) => {
          return {
            name: result.name,
            email: result.email,
            _id: result._id,
            request: {
              type: "GET",
              url:
                "http://localhost:8080/customer/account/findCustById/" +
                result._id,
            },
          };
        }),
      };
      if (results.length > 0) {
        res.status(200).json(response);
      } else {
        res.status(200).json("Empty List");
      }
    })
    .catch((err) => {
      console.log("Get All Customers Error" + err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.findCustById = (req, res) => {
  Customer.findById({ _id: req.params.custId })
    .select("name email _id")
    .exec()
    .then((result) => {
      if (result) {
        return res.status(200).json({
          name: result.name,
          email: result.email,
          _id: result._id,
        });
      } else {
        return res.status(404).json({ message: "Invalid Id" });
      }
    })
    .catch((err) => {
      console.log("FInd Customer By Id: " + err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.deleteCustomer = (req, res) => {
  Customer.deleteOne({ _id: req.params.custId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Account deleted Successfully",
      });
    })
    .catch((err) => {
      console.log("Delete Customer: " + err);
      res.status(500).json({
        error: err,
      });
    });
};
