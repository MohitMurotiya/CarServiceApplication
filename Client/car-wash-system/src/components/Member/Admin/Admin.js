import React, { useEffect } from "react";
import AdminNav from "./AdminNav";
import { Switch, Route } from "react-router-dom";
import AdminHome from "./AdminHome";
import Cars from "./Cars";
import Services from "./Services";
import Mechanic from "./Mechanic";
import Orders from "./Order";
import AuthService from "../../../services/member/auth_service";
import Products from "./Products";

function Admin(props) {
  useEffect(() => {
    const admin = AuthService.getAdmin();
    if (admin === null) {
      props.history.push("/login");
    }
  }, []);
  return (
    <div>
      <AdminNav />
      <AdminHome />
      <Switch>
        {/* <Route exact path="/admin_home" component={AdminHome} /> */}
        <Route path="/admin_home/cars" component={Cars} />
        <Route path="/admin_home/packages" component={Services} />
        <Route path="/admin_home/products" component={Products} />
        <Route path="/admin_home/mechanics" component={Mechanic} />
        <Route path="/admin_home/orders" component={Orders} />
      </Switch>
    </div>
  );
}

export default Admin;
