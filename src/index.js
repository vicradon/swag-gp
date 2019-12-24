import React from "react";
import ReactDOM from "react-dom";
import App from './components/App'
import store from './redux/store'
import { Provider } from 'react-redux'
import './styles.css'
import * as serviceWorker from './serviceWorker.js';
import { auth, db } from './firebase/index';

function sendToBrowserStore(state) {
  localStorage.setItem('app state', JSON.stringify(state))
  if (auth.currentUser !== null) {
    db.collection('users').doc(auth.currentUser.uid).set({ 
      appState: JSON.parse(localStorage.getItem('app state')) 
    })
  }
  else {
    console.log('Anonymous user')
  }
}

store.subscribe(() => sendToBrowserStore(store.getState()))

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById("root")
);

serviceWorker.register();