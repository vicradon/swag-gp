import { useContext } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Levels from "./pages/Levels/Levels";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import AuthRoute from "./components/AuthRoute";
import { AuthContext } from "./components/AuthProvider";

const Routes = () => {
  const { authState } = useContext(AuthContext);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Redirect to="/levels" />
        </Route>
        <Route exact path="/levels" component={Levels} />
        <Route exact path="/profile" component={Profile} />
        <AuthRoute
          authState={authState}
          exact
          path="/auth/login"
          component={Login}
        />
        <AuthRoute
          authState={authState}
          exact
          path="/auth/register"
          component={Register}
        />
        {/* <Route exact path="/auth/login" component={Login} />
        <Route exact path="/auth/register" component={Register} /> */}
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
