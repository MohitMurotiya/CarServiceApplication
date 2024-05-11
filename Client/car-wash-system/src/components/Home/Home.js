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
import FAQ from "./FAQ";

function Home() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={WhyUs} />
        <Route path="/whyus" component={WhyUs} />
        <Route path="/working" component={Working} />
        <Route path="/contact" component={Contact} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/member_login" component={Member_Login} />
        <Route path="/faqs" component={FAQ} />
      </Switch>
      <Footer />
    </Router>
  );
}

export default Home;
