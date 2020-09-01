import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from "./Navbar";
import WhyUs from "./WhyUs";
import OurBenfits from "./OurBenfits";
import Login from "./Login";
import Register from "./Register";
import Member_Login from "../Member/Member_Login";

function Home() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={WhyUs} />
        <Route path="/whyus" component={WhyUs} />
        <Route path="/benefits" component={OurBenfits} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/member_login" component={Member_Login} />
      </Switch>
    </Router>
  );
}

export default Home;
