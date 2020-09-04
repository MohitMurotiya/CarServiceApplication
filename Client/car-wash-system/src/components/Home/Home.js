import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from "./Navbar";
import WhyUs from "./WhyUs";
import Login from "./Login";
import Register from "./Register";
import Member_Login from "../Member/Member_Login";
import Contact from "./Contact";
import Working from "./Working";
import Footer from "./Footer";

function Home() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={WhyUs} />
        <Route exact path="/whyus" component={WhyUs} />
        <Route exact path="/working" component={Working} />
        <Route exact path="/contact" component={Contact} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/member_login" component={Member_Login} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default Home;
