export function handleAuthState(authState){
  return {
    type:"HANDLE_AUTH_STATE",
    authState:authState
  }
}

export function toggleAuthState(){
  return {
    type:"TOGGLE_AUTH_STATE"
  }
}

export function getUserDetails(details){
  return {
    type:"GET_USER_DETAILS",
    details:details
  }
}

export function setUserState(state){
  return {
    type:"SET_USER_STATE",
    state:state
  }
}