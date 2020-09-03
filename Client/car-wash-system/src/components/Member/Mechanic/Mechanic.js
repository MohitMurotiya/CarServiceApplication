import React from "react";
import MechanicNav from "./MechanicNav";
import MechanicHome from "./MechanicHome";
import { Switch, Route } from "react-router-dom";
import FindOrders from "./FindOrders";
import MyOrders from "./MyOrders";

function mechanic() {
  return (
    <div>
      <MechanicNav />
      <MechanicHome />
      <Switch>
        <Route path="/mechanic_home/findOrders" component={FindOrders} />
        <Route path="/mechanic_home/myorders" component={MyOrders} />
      </Switch>
    </div>
  );
}

export default mechanic;
