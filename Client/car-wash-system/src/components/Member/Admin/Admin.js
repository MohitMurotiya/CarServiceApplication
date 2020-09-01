import React from "react";
import AdminNav from "./AdminNav";
import { Switch, Route } from "react-router-dom";
import AdminHome from "./AdminHome";
import Cars from "./Cars";
import Services from "./Services";

function Admin() {
  return (
    <div>
      <AdminNav />
      <Switch>
        <Route exact path="/admin_home" component={AdminHome} />
        <Route path="/admin_home/cars" component={Cars} />
        <Route path="/admin_home/packages" component={Services} />
      </Switch>
    </div>
  );
}

export default Admin;
