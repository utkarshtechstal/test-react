import React from "react";
import { Route, Redirect } from "react-router-dom";

export const PublicRoute = (props) => {
  const { redirectTo = "/", auth, ...restProps } = props;
  
  if (auth!="") {
    return <Redirect to={redirectTo} />;
  }

  return <Route {...restProps} />;
};

export const PrivateRoute = (props) => {
  const { redirectTo = "/", auth, ...restProps } = props;

  if (auth=="") {
    return <Redirect to={redirectTo} />;
  }

  return <Route {...restProps} />;
};
