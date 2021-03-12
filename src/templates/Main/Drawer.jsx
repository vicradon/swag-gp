import { NavLink, Link, useLocation, useHistory } from "react-router-dom";
import styles from "./styles.module.css";
import icons from "../../components/icons.jsx";
import useWindowSize from "../../hooks/useWindowSize";
import { useContext } from "react";
import { AuthContext } from "../../components/AuthProvider";
import { Button } from "react-bootstrap";

function Drawer({ drawerVisible, setDrawerVisible }) {
  const { height, width } = useWindowSize();
  const { pathname } = useLocation();
  const history = useHistory();
  const { authState } = useContext(AuthContext);
  const handleLogout = () => {
    localStorage.clear();
    history.push("/");
  };
  const sidenavOpen = true;

  return (
    <div
      style={{
        height: "100vh",
        zIndex: 40,
        transform: drawerVisible
          ? `translateX(${width - 300}px)`
          : "translateX(452px)",
        position: "fixed",
        width: "300px",
        transition: "transform .3s",
      }}
      className="bg-dark"
    >
      <div className="d-flex justify-content-between flex-column py-3">
        <div className="flex-grow-1">
          <NavLink activeClassName="bg-primary" to="/levels">
            <div>
              <img src={icons.levels} alt="levels" />
            </div>
            <span className="ml-4">Levels</span>
          </NavLink>

          {authState.isAuthenticated && (
            <NavLink activeClassName="bg-primary" to="/profile">
              <div>
                <img src={icons.profile} alt="levels" />
              </div>
              <span className="ml-4">Profile</span>
            </NavLink>
          )}
        </div>
        <div>
          {authState.isAuthenticated ? (
            <Button onClick={handleLogout} variant="danger">
              <div>
                <img src={icons.logout} alt="logout" />
              </div>
              <span className="ml-4">Logout</span>
            </Button>
          ) : (
            <NavLink
              activeClassName="bg-primary"
              to={
                pathname.includes("register") ? "/auth/register" : "/auth/login"
              }
            >
              <div>
                <img src={icons.login} alt="login" />
              </div>

              <span className="ml-4">
                {pathname.includes("register") ? "Register" : "Login"}
              </span>
            </NavLink>
          )}
        </div>
      </div>
    </div>
  );
}

export default Drawer;
