const initialState = {
  authenticated: false,
  userDetails: {},
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_AUTH_DETAILS": {
      return {
        ...state,
        userDetails: action.payload.userDetails,
        authenticated: action.payload.authenticated,
      };
    }
    case "GET_USER_DETAILS": {
      return state.user;
    }
    case "IS_AUTHENTICATED": {
      return state.authenticated;
    }
    default:
      return state;
  }
}
