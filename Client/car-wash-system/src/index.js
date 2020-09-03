import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
//import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "fontsource-roboto";
import { BrowserRouter as Router } from "react-router-dom";
import { SnackbarProvider } from "notistack";

ReactDOM.render(
  <Router>
    <SnackbarProvider maxSnack={2}>
      <App />
    </SnackbarProvider>
  </Router>,

  document.getElementById("root")
);
