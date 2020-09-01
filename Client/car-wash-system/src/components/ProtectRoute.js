import React from "react";
import { Route, Redirect } from "react-router-dom";
import AuthService from "../services/customer/authentication/auth_service";

function ProtectRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (AuthService.isAuthenticated) {
          return <Component {...props} />;
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />
  );
}

export default ProtectRoute;
