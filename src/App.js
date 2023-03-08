import React from "react";
import { Route, Redirect, Switch, BrowserRouter, Router } from "react-router-dom";
import signIn from "./Pages/SignIn";
import ProfilePage from "./Pages/profile";
import { PrivateRoute, PublicRoute } from "./helper/route";




const App = () => {
    const auth = localStorage.getItem("token");
    return (
            <BrowserRouter>
                <Switch>
                  <Redirect exact from="/" to="/login" />
                  <PublicRoute
                      exact
                      path="/login"
                      auth={auth}
                      component={signIn}
                      redirectTo="/profile"
                  />
                  <PrivateRoute
                      exact
                      path="/profile"
                      auth={auth}
                      redirectTo="/"
                      component={ProfilePage}
                  />
                  {/* <Route exact path="/not-found" component={NotFound} /> */}
                  {/* <Redirect to={`not-found`} /> */}
                </Switch>
            </BrowserRouter>
    );
};


export default App;
