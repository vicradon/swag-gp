import Levels from "../pages/Levels/Levels";

function AuthRoute({ component: Component, authState }) {
  if (authState.isAuthenticated) {
    window.location.pathname = "/levels";
    return <Levels />;
  } else {
    return <Component />;
  }
}

export default AuthRoute;
