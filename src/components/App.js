import React from "react";
import Header from "./header";
import Aside from "./aside";
import Main from './Main'

import '../css/style.css'
import '../css/position.css'
import '../css/pop-ups.css'

function App() {
  return (
    <div className = "container">
      <Header />
      <Aside />
      <Main />
    </div>
  );
}

export default App;