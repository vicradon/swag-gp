import React from 'react'
import { Link } from 'react-router-dom';

const SignedOutLinks = () => {
  return (
    <>
      <Link className="nav-link auth-page" to="/login">
        LOGIN
      </Link>
    </>
  );
};

export default SignedOutLinks;
