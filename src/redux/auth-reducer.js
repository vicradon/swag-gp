import { auth } from '../firebase/index'
console.log(auth.currentUser)
// let online = '';

// auth.onAuthStateChanged(user => {
//   if (user) {
//     online = true
//   }
//   else {
//     console.log("User logged out");
//     online = false
//   }
// })
// console.log(auth.currentUser)

const initialState = {
  isOnline: null//!!auth.currentUser.uid
}

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "HANDLE_ONLINE":
      return {
        ...state,
        isOnline: action.onlineState
      }
    case "TOGGLE_ONLINE":
      return {
        ...state,
        isOnline: !state.isOnline
      }
    default:
      return state
  }
}