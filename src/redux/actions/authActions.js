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