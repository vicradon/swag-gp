import {auth} from '../firebase/index'
let online = '';

auth.onAuthStateChanged(user => {
  if (user) {
    online = true
  }
  else {
    console.log("User logged out");
    online = false
  }
})
console.log(online)

const initialState = {
  isOnline:online
}

export default function authReducer(state = initialState, action){
  switch (action.type){
    default:
      return state
  }
}