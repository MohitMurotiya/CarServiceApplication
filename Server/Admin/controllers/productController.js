const ProductModel = require("../model/productModel");

exports.addProduct = (req, res) => {
    ProductModel.findOne({ name: req.body.name })
    .exec()
    .then((response) => {
      if (response) {
        return res.status(409).json({
          message: "Entered Product Name is Already Exist",
        });
      } else {
        const product = new ProductModel({
          productType: req.body.productType,
          name: req.body.name,
          price: req.body.price,
          description: req.body.description,
        });
        product.save().then((response) => {
          console.log("Product Added: " + response);
          res.status(201).json({
            message: "Product Added Successfully",
          });
        });
      }
    })
    .catch((err) => {
      console.log("Add Product Error: " + err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.findAll = (req, res) => {
  ProductModel.find()
    .select("-__v")
    .exec()
    .then((response) => {
      if (response.length == 0) {
        res.status(200).json({
          message: "No Products Available at this Time",
        });
      } else {
        res.status(200).json({
          product: response,
        });
      }
    })
    .catch((err) => {
      console.log("Find All Method Error: " + err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.updateProduct = (req, res) => {
  const id = req.params.productId;
  ProductModel.updateMany({ _id: id }, { $set: req.body })
    .exec()
    .then((response) => {
      console.log("Updated Product Successfully: " + response);
      res.status(200).json({
        message: " Product Updated Successfully",
      });
    })
    .catch((err) => {
      console.log("Product Update error: " + err);
      res.status(500).json({ "Product Update error ": err });
    });
};

exports.deleteProduct = (req, res) => {
  const id = req.params.productId;
  ProductModel.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        status: "Product Deleted Successfully",
      });
    })
    .catch((err) => {
      console.log("Product Delete Error: " + err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.findByProductId = (req, res) => {
  ServiceModel.findOne({ _id: req.params.productId })
    .exec()
    .then((response) => {
      if (response == null) {
        return res.status(404).json({
          message: "This Product is Not available",
        });
      } else {
        return res.status(200).json({
          response,
        });
      }
    })
    .catch((err) => {
      console.log("Find By Product Error: " + err);
      res.status(500).json({
        error: err,
      });
    });
};
