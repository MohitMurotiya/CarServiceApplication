import axios from "axios";
import mechHeader from "../mech_header";

const API_URL = "http://localhost:8020/mechanic/orders/";

class MechanicOrders {
  getInProcessOrders(mechId) {
    console.log("Method: " + mechId);
    return axios
      .get(API_URL + `findInProcessOrders/${mechId}`, {
        headers: mechHeader(),
      })
      .then((res) => {
        return res.data.orders;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateOrder(orderId, status) {
    return axios
      .patch(
        API_URL + `updateOrder/${orderId}`,
        {
          status,
        },
        {
          headers: mechHeader(),
        }
      )
      .then((res) => {
        return res.data.message;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getAllOrders(mechId) {
    return axios
      .get(API_URL + `findMyOrders/${mechId}`, {
        headers: mechHeader(),
      })
      .then((res) => {
        return res.data.orders;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export default new MechanicOrders();
