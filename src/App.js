import React from "react";
import { Route, Redirect, Switch, BrowserRouter, Router } from "react-router-dom";
import signIn from "./Pages/SignIn";
import ProfilePage from "./Pages/profile";




const App = () => {

    return (
            <BrowserRouter>
                <Switch>
                  <Redirect exact from="/" to="/login" />
                  <Route
                      exact
                      path="/login"
                      component={signIn}
                  />
                  <Route
                      exact
                      path="/profile"
                      component={ProfilePage}
                  />
                  {/* <Route exact path="/not-found" component={NotFound} /> */}
                  {/* <Redirect to={`not-found`} /> */}
                </Switch>
            </BrowserRouter>
    );
};


export default App;
