import React from "react";
import { Link } from "react-router-dom";

const SideNav = ({
  sideNav,
  closeNav,
  authenticated,
  displayName,
  photoURL,
  signOut,
}) => {
  console.log({ photoURL });
  return (
    <div ref={sideNav} className="side-nav">
      <div className="close-side-nav">
        <p className="close-button">
          <i onClick={closeNav} className="material-icons">
            close
          </i>
        </p>
      </div>
      <div className="user-details">
        {photoURL ? (
          <img
            style={{ width: "5rem", borderRadius: "50%" }}
            src={photoURL}
            alt="gravater"
          />
        ) : (
          <i id="user-icon" className="material-icons">
            person_pin
          </i>
        )}
        {displayName ? (
          <p className="username">{displayName}</p>
        ) : (
          <p className="username">Username</p>
        )}
      </div>
      <p
        className="hor-line"
        style={{ border: "1px solid var(--primary-color)", margin: "2rem 0" }}
      ></p>
      <div className="side-nav-links">
        <Link className="side-nav-link" to="/about">
          ABOUT
        </Link>
        {authenticated ? (
          <a onClick={signOut} className="side-nav-link" href="/logout">
            LOGOUT
          </a>
        ) : (
          <Link className="side-nav-link auth-page" to="/login">
            LOGIN
          </Link>
        )}
      </div>
    </div>
  );
};

export default SideNav;
