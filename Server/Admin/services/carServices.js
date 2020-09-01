const express = require("express");
const router = express.Router();
const checkAuth = require("../middlewares/check-auth");
const CarController = require("../controllers/carController");

//Add Car
router.post(
  "/addCar",
  [checkAuth.verifyToken, checkAuth.isAdmin],
  CarController.addCar
);

router.get("/findAll", CarController.findAllCars);

//FInd All Brands
router.get("/findAllBrands", CarController.findAllBrands);

//Find All Cars Specific Brand
router.post("/findByBrand", CarController.findByBrand);

//FInd Car By It's Name
router.post("/findByCar", CarController.findByCar);

//Update Car Details
router.patch(
  "/updateCar/:id",
  [checkAuth.verifyToken, checkAuth.isAdmin],
  CarController.updateCar
);

router.delete(
  "/deleteCar/:carId",
  [checkAuth.verifyToken, checkAuth.isAdmin],
  CarController.deleteCar
);
module.exports = router;
