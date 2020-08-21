export function setReduxStoreData(data) {
  return {
    type: "SET_REDUX_STORE_DATA",
    payload: {
      data
    },
  };
}
