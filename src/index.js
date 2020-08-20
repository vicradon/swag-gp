import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";

import "./styles.css";
import * as serviceWorker from "./serviceWorker.js";

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorker.register();
