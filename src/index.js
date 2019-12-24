import React from "react";
import ReactDOM from "react-dom";
import App from './components/App'
import store from './redux/store'
import { Provider } from 'react-redux'
import './styles.css'
import * as serviceWorker from './serviceWorker.js';
import localforage from 'localforage'

function sendToBrowserStore(state) {
  localforage.setItem('app state', state)
}

store.subscribe(() => sendToBrowserStore(store.getState()))

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById("root")
);

serviceWorker.register();