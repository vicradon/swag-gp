import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Levels from "./pages/Levels/Levels";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Levels} />
        <Route exact path="/levels" component={Levels} />
        <Route exact path="/profile" component={Profile} />
        <Route path="/auth/login" component={Login} />
        <Route path="/auth/register" component={Register} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
