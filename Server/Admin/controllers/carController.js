const CarModel = require("../model/carModel");

//Add Car
exports.addCar = (req, res) => {
  CarModel.findOne({ name: req.body.name })
    .exec()
    .then((response) => {
      if (response) {
        return res.status(409).json({
          message: "Name Already Exist",
        });
      } else {
        const car = new CarModel({
          name: req.body.name,
          brand: req.body.brand,
        });
        car.save().then((response) => {
          console.log("Car Added: " + response);
          res.status(201).json({
            message: "Car Added Successfully",
            car: {
              brand: response.brand,
              name: response.name,
              _id: response._id,
            },
          });
        });
      }
    })
    .catch((err) => {
      console.log("Add Car Error: " + err);
      res.status(500).json({
        error: err,
      });
    });
};

//Find All Cars
exports.findAllCars = (req, res) => {
  CarModel.find()
    .select("_id name brand")
    .exec()
    .then((response) => {
      if (response.length == 0) {
        res.status(200).json({
          message: "No Cars Available",
        });
      } else {
        res.send(response);
      }
    })
    .catch((err) => {
      console.log("Find All Cars Method Error: " + err);
      res.status(500).json({
        error: err,
      });
    });
};

//Find All Brands
exports.findAllBrands = (req, res) => {
  CarModel.find()
    .distinct("brand")
    .exec()
    .then((response) => {
      if (response.length == 0) {
        res.status(200).json({
          message: "No Brands Available",
        });
      } else {
        res.send(response);
      }
    })
    .catch((err) => {
      console.log("Find All Brand Method Error: " + err);
      res.status(500).json({
        error: err,
      });
    });
};

//Find All Cars By Brands
exports.findByBrand = (req, res) => {
  CarModel.find({ brand: req.body.brand })
    .select("name")
    .exec()
    .then((response) => {
      if (response.length < 1) {
        return res.status(404).json({
          message: "This Brand is Not available",
        });
      } else {
        return res.status(200).json({
          cars: response.map((car) => {
            return { name: car.name, _id: car._id };
          }),
        });
      }
    })
    .catch((err) => {
      console.log("Find By Brand Error: " + err);
      res.status(500).json({
        error: err,
      });
    });
};

//FInd Car By Name
exports.findByCar = (req, res) => {
  CarModel.findOne({ name: req.body.name })
    .exec()
    .then((response) => {
      if (response == null) {
        return res.status(404).json({
          message: "This Car is Not available",
        });
      } else {
        return res.status(200).json({
          name: response.name,
          _id: response._id,
          brans: response.brand,
        });
      }
    })
    .catch((err) => {
      console.log("Find By Car Error: " + err);
      res.status(500).json({
        error: err,
      });
    });
};

//Update Car Details
exports.updateCar = (req, res) => {
  let obj = req.body;
  const id = req.params.id;
  CarModel.updateOne({ _id: id }, { $set: obj })
    .exec()
    .then((response) => {
      console.log("Updated Successfully");
      res.status(200).json({
        message: "Car Updated Successfully",
      });
    })
    .catch((err) => {
      console.log("Update Car Error: " + err);
      res.status(500).json({
        error: err,
      });
    });
};

exports.deleteCar = (req, res) => {
  CarModel.deleteOne({ _id: req.params.carId })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Car deleted Successfully",
      });
    })
    .catch((err) => {
      console.log("Delete Car: " + err);
      res.status(500).json({
        error: err,
      });
    });
};
