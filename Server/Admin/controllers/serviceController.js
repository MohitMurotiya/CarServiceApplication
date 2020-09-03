const ServiceModel = require("../model/serviceModel");

exports.addService = (req, res) => {
  ServiceModel.findOne({ name: req.body.name })
    .exec()
    .then((response) => {
      if (response) {
        return res.status(409).json({
          message: "Entered Service Name is Already Exist",
        });
      } else {
        const service = new ServiceModel({
          serviceType: req.body.serviceType,
          name: req.body.name,
          price: req.body.price,
          description: req.body.description,
          timeRequired: req.body.timeRequired,
          where: req.body.where,
        });
        service.save().then((response) => {
          console.log("Service Added: " + response);
          res.status(201).json({
            message: "Service Added Successfully",
          });
        });
      }
    })
    .catch((err) => {
      console.log("Add Service Error: " + err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.findAll = (req, res) => {
  ServiceModel.find()
    .select("-__v")
    .exec()
    .then((response) => {
      if (response.length == 0) {
        res.status(200).json({
          message: "No Services Available at this Time",
        });
      } else {
        res.status(200).json({
          service: response,
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

exports.updateService = (req, res) => {
  const id = req.params.serviceId;
  ServiceModel.updateMany({ _id: id }, { $set: req.body })
    .exec()
    .then((response) => {
      console.log("Updated Service Successfully: " + response);
      res.status(200).json({
        message: " Service Updated Successfully",
      });
    })
    .catch((err) => {
      console.log("Serivce Update error: " + err);
      res.status(500).json({ "Serivce Update error ": err });
    });
};

exports.deleteService = (req, res) => {
  const id = req.params.serviceId;
  ServiceModel.deleteOne({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        status: "Service Deleted Successfully",
      });
    })
    .catch((err) => {
      console.log("Service Delete Error: " + err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.findByServiceId = (req, res) => {
  ServiceModel.findOne({ _id: req.params.serviceId })
    .exec()
    .then((response) => {
      if (response == null) {
        return res.status(404).json({
          message: "This Service is Not available",
        });
      } else {
        return res.status(200).json({
          response,
        });
      }
    })
    .catch((err) => {
      console.log("Find By Service Error: " + err);
      res.status(500).json({
        error: err,
      });
    });
};
