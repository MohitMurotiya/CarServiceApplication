import axios from "axios";

const AUTH_URL = "http://localhost:8010/admin/auth/";

class AuthService {
  login(email, password) {
    return axios
      .post(AUTH_URL + "login", { email, password })
      .then((response) => {
        if (response.data.token) {
          if (response.data.role === "ADMIN") {
            console.log(response.data.name);
            localStorage.setItem("admin", JSON.stringify(response.data));
          } else {
            console.log(response.data.name);
            localStorage.setItem("member", JSON.stringify(response.data));
          }
        }
        return response.data;
      })
      .catch((err) => {
        console.log("Login Error" + err);
      });
  }

  logout() {
    this.authenticated = false;
    localStorage.removeItem("admin");
    console.log("Inside Logout Method");
  }

  register(name, email, password) {
    return axios.post(AUTH_URL + "register", {
      name,
      email,
      password,
    });
  }

  isAuthenticated() {
    return this.authenticated;
  }
  getCurrentCustomer() {
    return JSON.parse(localStorage.getItem("admin"));
  }
}

export default new AuthService();
