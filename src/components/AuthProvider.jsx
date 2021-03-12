import { createContext, useReducer } from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "AUTHENTICATE_USER": {
      return {
        ...state,
        isAuthenticated: true,
      };
    }
    case "UNAUTHENTICATE_USER": {
      return {
        ...state,
        isAuthenticated: false,
      };
    }
    default:
      return state;
  }
};

const authState = {
  isAuthenticated: Boolean(localStorage.getItem("token")),
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, authState);

  return (
    <AuthContext.Provider value={{ authState: state, authDispatch: dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export const AuthContext = createContext(authState);
export default AuthProvider;
