import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import Navbar from "./Navbar";
import Aside from "./aside";
import Main from "./Main";
import About from "./pages/About";
import Login from "./pages/auth/login";
import SignUp from "./pages/auth/signup";
import LogOut from "./pages/auth/LogOut";
import ResetPassword from "./pages/auth/resetpassword";
import { auth } from "../firebase";

import "../css/style.css";
import "../css/mdi/mdi.css";
import "../css/position.css";
import "../css/pop-ups.css";

const MainApp = () => (
  <>
    <Aside />
    <Main />
  </>
);

const App = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    const authState = {};
    auth.onAuthStateChanged((user) => {
      if (user) {
        authState.authenticated = true;
        authState.userDetails = user.providerData[0];
        dispatch({ type: "SET_AUTH_DETAILS", payload: authState });
      }
    });
  }, [dispatch]);
  return (
    <BrowserRouter>
      <div className="container">
        <Navbar />
        <Switch>
          <Route exact path="/" component={MainApp} />
          <Route path="/about" component={About} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <Route path="/logout" component={LogOut} />
          <Route path="/reset-password" component={ResetPassword} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
