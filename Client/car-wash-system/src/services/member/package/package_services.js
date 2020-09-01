import axios from "axios";
import authHeader from "../auth_header";

const API_URL = "http://localhost:8010/admin/car-services/";

class Package {
  getAllServices() {
    return axios
      .get(API_URL + "findAll")
      .then((response) => {
        console.log(response.data.service);

        return response.data.service;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addService(serviceType, name, price, description, timeRequired, where) {
    return axios
      .post(
        API_URL + "addService",
        { serviceType, name, price, description, timeRequired, where },
        {
          headers: authHeader(),
        }
      )
      .then((res) => {
        return res.data.message;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateService(
    id,
    serviceType,
    name,
    price,
    description,
    timeRequired,
    where
  ) {
    return axios
      .patch(
        API_URL + `updateService/${id}`,
        { id, serviceType, name, price, description, timeRequired, where },
        {
          headers: authHeader(),
        }
      )
      .then((res) => {
        return res.data.message;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteService(id) {
    return axios
      .delete(API_URL + `deleteService/${id}`, {
        headers: authHeader(),
      })
      .then((res) => {
        return res.data.status;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export default new Package();
