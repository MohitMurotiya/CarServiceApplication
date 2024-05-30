import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CustNav from "./CustNav";
import CustHome from "./CustHome";
import Cars from "./Cars";
import Services from "./Services";
import Products from "./Products";
import Category from "./Category";
import Login from "../Home/Login";
import Order from "./Order";
import MyBookings from "./MyBookings";
import Contact from "../Home/Contact";
import AuthService from "../../services/customer/authentication/auth_service";

function Cust_Home(props) {
  useEffect(() => {
    const user = AuthService.getCurrentCustomer();
    if (user === null) {
      props.history.push("/login");
    }
  }, []);
  return (
    <div>
      <CustNav />
      <Switch>
        <Route exact path="/cust_home" component={CustHome} />
        <Route exact path="/cust_home/contact" component={Contact} />
        <Route
          exact
          path="/cust_home/cars/:brand"
          render={(props) => <Cars {...props} />}
        />
        <Route
          path="/cust_home/services/:car"
          render={(props) => <Services {...props} />}
        />
        <Route exact path="/cust_home/products" component={Category} />
        <Route
          exact
          path="/cust_home/products/:category"
          render={(props) => <Products {...props} />}
        />
        <Route
          path="/cust_home/order/car/:carId/service/:serviceId"
          render={(props) => <Order {...props} />}
        />
        <Route
          path="/cust_home/mybookings"
          render={(props) => <MyBookings {...props} />}
        />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default Cust_Home;
