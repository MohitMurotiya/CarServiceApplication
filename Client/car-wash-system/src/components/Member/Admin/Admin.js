import React from "react";
import AdminNav from "./AdminNav";
import { Switch, Route } from "react-router-dom";
import AdminHome from "./AdminHome";
import Cars from "./Cars";
import Services from "./Services";
import Mechanic from "./Mechanic";
import Orders from "./Order";

function Admin() {
  return (
    <div>
      <AdminNav />
      <AdminHome />
      <Switch>
        {/* <Route exact path="/admin_home" component={AdminHome} /> */}
        <Route path="/admin_home/cars" component={Cars} />
        <Route path="/admin_home/packages" component={Services} />
        <Route path="/admin_home/mechanics" component={Mechanic} />
        <Route path="/admin_home/orders" component={Orders} />
      </Switch>
    </div>
  );
}

export default Admin;
