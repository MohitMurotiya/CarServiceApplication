import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import CustNav from "./CustNav";
import CustHome from "./CustHome";
import Cust_Contact from "./Cust_Contact";
import Cars from "./Cars";
import Services from "./Services";
import Login from "../Home/Login";

function Cust_Home() {
  return (
    <div>
      <CustNav />
      <Switch>
        <Route exact path="/cust_home" component={CustHome} />
        <Route path="/cust_home/contact" component={Cust_Contact} />
        <Route
          path="/cust_home/cars/:brand"
          render={(props) => <Cars {...props} />}
        />
        <Route
          path="/cust_home/services/:car"
          render={(props) => <Services {...props} />}
        />
        <Route path="/login" component={Login} />
      </Switch>
    </div>
  );
}

export default Cust_Home;
