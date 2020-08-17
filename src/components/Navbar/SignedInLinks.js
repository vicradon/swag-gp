import React from "react";

const SignedInLinks = ({ signOut, photoURL }) => {
  return (
    <>
      <a onClick={signOut} className="nav-link" href="/logout">
        LOGOUT
      </a>
      <img
        style={{ width: "3rem", borderRadius: "50%" }}
        src={photoURL}
        alt="gravater"
      />
    </>
  );
};

export default SignedInLinks;
