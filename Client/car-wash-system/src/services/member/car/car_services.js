import axios from "axios";
import authHeader from "../auth_header";

const API_URL = "http://localhost:8010/admin/car-func/";

class CarService {
  getAllBrands() {
    return axios
      .get(API_URL + "findAllBrands")
      .then((response) => {
        //console.log(response.data);
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getCarsByBrand(brand) {
    console.log("Get Brand: " + brand);
    return axios
      .post(API_URL + "findByBrand", { brand })
      .then((response) => {
        //console.log(response.data.cars[0]);
        return response.data.cars;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getAllCars() {
    return axios
      .get(API_URL + "findAll")
      .then((response) => {
        //console.log(response.data);
        return response.data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addCar(name, brand) {
    return axios
      .post(
        API_URL + "addCar",
        {
          name,
          brand,
        },
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        return response.data.message;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteCar(carId) {
    return axios
      .delete(API_URL + `deleteCar/${carId}`, {
        headers: authHeader(),
      })
      .then((res) => {
        console.log(res);
        return res.data.message;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateCar(carId, brand) {
    return axios
      .patch(
        API_URL + `updateCar/${carId}`,
        {
          brand,
        },
        {
          headers: authHeader(),
        }
      )
      .then((response) => {
        return response.data.message;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  findCarById(carId) {
    return axios
      .get(API_URL + `findByCar/${carId}`)
      .then((response) => {
        return response.data.response;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export default new CarService();
