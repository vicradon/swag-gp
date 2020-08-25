import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

import "../../css/nav-aside.css";
import { auth } from "../../firebase/index";
import SignedOutLinks from "./SignedOutLinks";
import SignedInLinks from "./SignedInLinks";
import SideNav from "./SideNav";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  const { authenticated, photoURL, displayName } = useSelector((state) => {
    return {
      authenticated: state.auth.authenticated,
      photoURL: state.auth.photoURL,
      displayName: state.auth.displayName,
    };
  });
  const history = useHistory();

  const signOut = () => {
    auth.signOut().then(() => {
      localStorage.removeItem("app state");
      history.push("/signout");
    });
  };

  function openNav() {
    sideNav.current.classList.add("is-nav-open");
  }
  function closeNav() {
    sideNav.current.classList.remove("is-nav-open");
  }
  const sideNav = useRef(null);

  return (
    <>
      <nav>
        <p className="invisible">
          <FaBars style={{ color: "white" }} onClick={openNav} />
        </p>
        <Link style={{ color: "inherit", textDecoration: "none" }} to="/">
          <p id="swag-gp-logo">SWAG-GP</p>
        </Link>

        <div className="user-actions">
          <Link className="nav-link" to="/about">
            ABOUT
          </Link>
          {authenticated ? (
            <SignedInLinks signOut={signOut} photoURL={photoURL} />
          ) : (
            <SignedOutLinks />
          )}
        </div>
      </nav>
      <SideNav
        sideNav={sideNav}
        closeNav={closeNav}
        displayName={displayName}
        photoURL={photoURL}
        signOut={signOut}
        authenticated={authenticated}
      />
    </>
  );
};

export default Navbar;
