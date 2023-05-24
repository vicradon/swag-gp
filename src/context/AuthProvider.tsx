import { createContext, useContext, useReducer } from "react";
import maxios from "utils/maxios";

const authState = {
  isAuthenticated: Boolean(localStorage.getItem("token")),
};

type ACTIONTYPE =
  | { type: "AUTHENTICATE_USER"; payload: { token: string } }
  | { type: "UNAUTHENTICATE_USER" };

const reducer = (state: typeof authState, action: ACTIONTYPE) => {
  switch (action.type) {
    case "AUTHENTICATE_USER": {
      localStorage.setItem("token", action.payload.token);
      maxios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${action.payload.token}`;
      window.location.href = "/";

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

type AuthContextType = {
  authState: typeof authState;
  authDispatch: React.Dispatch<ACTIONTYPE>;
};

export const AuthContext = createContext<AuthContextType>({
  authState,
  authDispatch: () => null,
});

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, authState);

  return (
    <AuthContext.Provider value={{ authState: state, authDispatch: dispatch }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthProvider;
