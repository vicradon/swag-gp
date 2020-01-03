import { auth, db } from '../firebase/index'
let loggedin = false;

auth.onAuthStateChanged(user => {
  if (user) {
    loggedin = true
  }
  else {
    console.log("User logged out");
    loggedin = false
  }
})

let initialState = {
  isLoggedIn: loggedin
}
if (localStorage.getItem('app state')) {
  initialState = JSON.parse(localStorage.getItem('app state')).auth
} else if (auth.currentUser !== null) {
  initialState = db.collection('users').doc(auth.currentUser.uid).appState.auth;
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "HANDLE_AUTH_STATE":
      console.log({
        ...state,
        isLoggedIn: action.authState
      })
      return {
        ...state,
        isLoggedIn: action.authState
      };
    case "TOGGLE_AUTH_STATE":
      return {
        ...state,
        isLoggedIn: !state.authState
      };
    default:
      return state
  }
}