export function handleOnline(onlineState){
  return {
    type:"HANDLE_ONLINE",
    isOnline:onlineState
  }
}

export function toggleOnline(){
  return {
    type:"TOGGLE_ONLINE"
  }
}