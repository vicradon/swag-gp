import React from "react";
import Navbar from "./navbar";
import Aside from "./aside";
import Main from './Main'
import About from './pages/About'
import SignIn from './pages/auth/signin'
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
          <Route path='/pages/about' component={About} />
          <Route path='/pages/auth/signin' component={SignIn} />
          <Route path='/pages/auth/signup' component={SignUp} />
          {/* <Route path='/pages/auth/signout'component={SignOut} />
          <Route path='/pages/auth/reset-password'component={ResetPassword} /> */}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;