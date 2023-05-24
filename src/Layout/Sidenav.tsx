import { NavLink, Link, useLocation } from "react-router-dom";
import styles from "./styles.module.css";
import icons from "components/Icons";
import useWindowSize from "hooks/useWindowSize";
import { useContext } from "react";
import { AuthContext } from "context/AuthProvider";
import { Button } from "react-bootstrap";

interface Props {
  drawerVisible: boolean;
  sidenavOpen: boolean;
}

function Sidenav({ drawerVisible, sidenavOpen }: Props) {
  const { height } = useWindowSize();
  const { pathname } = useLocation();

  const { authDispatch } = useContext(AuthContext);
  const { authState } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.clear();
    authDispatch({ type: "UNAUTHENTICATE_USER" });
    window.location.href = "/";
  };

  return (
    <div
      style={{
        width: "200px",
        position: "fixed",
        transform: drawerVisible ? "translateX(0px)" : "translateX(-200px)",
        transition: "transform .3s",
      }}
      className={`${styles.sidenav}`}
    >
      {sidenavOpen && (
        <div className={`py-4 d-flex  align-items-baseline`}>
          <Link to="/" className="ml-4 text-white">
            SwagGP
          </Link>
        </div>
      )}

      <div
        style={{ height: `${height - 70}px` }}
        className="d-flex justify-content-between flex-column"
      >
        <div className="flex-grow-1">
          <NavLink
            // activeClassName="bg-primary"
            className={`p-4 d-flex  align-items-baseline text-white`}
            to="/levels"
          >
            <div>
              <img src={icons.levels} alt="levels" />
            </div>
            <span className="ml-4">Levels</span>
          </NavLink>

          {authState.isAuthenticated && (
            <NavLink
              // activeClassName="bg-primary"
              className={`p-4 d-flex  align-items-baseline text-white`}
              to="/profile"
            >
              <div>
                <img src={icons.profile} alt="levels" />
              </div>
              <span className="ml-4">Profile</span>
            </NavLink>
          )}
        </div>
        <div>
          {authState.isAuthenticated ? (
            <Button
              className={`px-4 w-100 d-flex align-items-baseline text-white my-3`}
              onClick={handleLogout}
              variant="transparent"
            >
              <div>
                <img
                  className={styles.logoutIcon}
                  src={icons.logout}
                  alt="logout"
                />
              </div>
              <span className="ml-4">Logout</span>
            </Button>
          ) : (
            <NavLink
              // activeClassName="bg-primary"
              to={
                pathname.includes("register") ? "/auth/register" : "/auth/login"
              }
              className={`p-4 d-flex align-items-baseline  text-white`}
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

export default Sidenav;
