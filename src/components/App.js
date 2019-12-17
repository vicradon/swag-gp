import React from "react";
import Navbar from "./navbar";
import Aside from "./aside";
import Main from './Main'
import About from './pages/About'

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
          <Route exact path='/'component={MainApp} />
          <Route path='/pages/about'component={About} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;