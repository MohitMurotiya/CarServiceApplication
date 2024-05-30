import axios from "axios";
import authHeader from "../auth_header";

const API_URL = "http://localhost:8010/admin/car-products/";

class Products {
  getAllProducts() {
    return axios
      .get(API_URL + "findAll")
      .then((response) => {
        return response.data.product;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addProduct(productType, name, price, description) {
    return axios
      .post(
        API_URL + "addProduct",
        { productType, name, price, description },
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

  updateProduct(
    id,
    productType,
    name,
    price,
    description
  ) {
    return axios
      .patch(
        API_URL + `updateProduct/${id}`,
        { id, productType, name, price, description },
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

  deleteProduct(id) {
    return axios
      .delete(API_URL + `deleteProduct/${id}`, {
        headers: authHeader(),
      })
      .then((res) => {
        return res.data.status;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  findProductById(id) {
    return axios
      .get(API_URL + `findById/${id}`)
      .then((res) => {
        return res.data.response;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export default new Products();
