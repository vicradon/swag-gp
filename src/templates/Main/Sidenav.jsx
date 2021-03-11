import { NavLink, Link, useLocation } from "react-router-dom";
import styles from "./styles.module.css";
import icons from "../../components/icons.jsx";
import useWindowSize from "../../hooks/useWindowSize";

function Sidenav({ sidenavOpen, setSidenavVisible }) {
  const { height } = useWindowSize();
  const { pathname } = useLocation();

  return (
    <div
      style={{ width: sidenavOpen ? "200px" : "50px" }}
      className={`${styles.sidenav}`}
    >
      <div
        className={`${
          sidenavOpen ? "px-4" : "px-2 d-flex justify-content-center"
        } py-4 d-flex  align-items-baseline`}
      >
        <div>
          <img
            className="cursor-pointer"
            onClick={() => setSidenavVisible(!sidenavOpen)}
            src={icons.menu}
            alt="menu"
          />
        </div>
        {sidenavOpen && (
          <Link to="/" className="ml-4 text-white">
            Swag GP
          </Link>
        )}
      </div>

      <div
        style={{ height: `${height - 70}px` }}
        className="d-flex justify-content-between flex-column"
      >
        <div className="flex-grow-1">
          <NavLink
            activeClassName="bg-primary"
            className={`${
              sidenavOpen ? "px-4" : "px-2 d-flex justify-content-center"
            } py-4 d-flex  align-items-baseline text-white`}
            to="/levels"
          >
            <div>
              <img src={icons.levels} alt="levels" />
            </div>
            {sidenavOpen && <span className="ml-4">Levels</span>}
          </NavLink>

          <NavLink
            activeClassName="bg-primary"
            className={`${
              sidenavOpen ? "px-4" : "px-2 d-flex justify-content-center"
            } py-4 d-flex  align-items-baseline text-white`}
            to="/profile"
          >
            <div>
              <img src={icons.profile} alt="levels" />
            </div>
            {sidenavOpen && <span className="ml-4">Profile</span>}
          </NavLink>
        </div>
        <div>
          <NavLink
            activeClassName="bg-primary"
            to={
              pathname.includes("register") ? "/auth/register" : "/auth/login"
            }
            className={`${
              sidenavOpen ? "px-4" : "px-2 ml-2"
            } py-4 d-flex align-items-baseline  text-white`}
          >
            <div>
              <img src={icons.login} alt="levels" />
            </div>
            {sidenavOpen && (
              <span className="ml-4">
                {pathname.includes("register") ? "Register" : "Login"}
              </span>
            )}
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Sidenav;
