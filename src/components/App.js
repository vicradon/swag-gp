import React from "react";
import Navbar from "./navbar";
import Aside from "./aside";
import Main from './Main'
import About from './pages/About'
import Login from './pages/auth/login'
import SignUp from './pages/auth/signup'
import SignOut from './pages/auth/signout'
import ResetPassword from './pages/auth/resetpassword'

import '../css/style.css'
import '../css/position.css'
import '../css/pop-ups.css'

import { BrowserRouter, Switch, Route } from 'react-router-dom'

const MainApp = () => (<><Aside /><Main /></>);

function App() {
  return (
    <BrowserRouter >
      <div className="container">
        <Navbar />
        <Switch>
          <Route exact path='/' component={MainApp} />
          <Route path='/about' component={About} />
          <Route path='/login' component={Login} />
          <Route path='/signup' component={SignUp} />
          <Route path='/signout'component={SignOut} />
          <Route path='/reset-password'component={ResetPassword} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;