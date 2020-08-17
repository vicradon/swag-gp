import React, { useState } from "react";
import AuthLayout from "../AuthLayout";
import firebase, { auth } from "../../../firebase/index";
import { snack } from "../../../redux/utility-functions";
import { connect } from "react-redux";
import {
  handleAuthState,
  getUserDetails,
  setUserState,
} from "../../../redux/actions/authActions";
import { useHistory } from "react-router-dom";

function Login({ handleAuthState, getUserDetails, setUserState }) {
  const history = useHistory();

  React.useEffect(() => {
    auth.getRedirectResult().then((result) => {
      if (result.user) {
        history.push("/");
      }
    });
  }, [history]);

  const initialFormState = {
    email: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormState);
  const handleInput = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(formData.email, formData.password)
      .then((credentials) => {
        setFormData(initialFormState);
        snack("Login successful!");
        handleAuthState(true);
        getUserDetails({
          photoUrl: credentials.user.photoURL,
          displayName: credentials.user.displayName,
        });
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        snack(err.message);
      });
  };

  const handleGoogleSignin = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithRedirect(provider).catch((err) => {
      console.error(err);
      snack(err.message);
    });
  };

  return (
    <AuthLayout>
      <div className="signin-form">
        <h3>Login to Swag-GP</h3>
        <div className="oauth">
          <h4>Login with</h4>
          <div className="auth-buttons">
            <div onClick={handleGoogleSignin} className="auth-btn">
              <div className="auth-icon-wrapper">
                <img
                  alt="Google logo"
                  className="auth-icon-svg"
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                />
              </div>
              <p className="btn-text">
                <b>Google</b>
              </p>
            </div>
          </div>
        </div>
        <h4>Or login with email</h4>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Email</p>
            <input
              required
              onChange={handleInput}
              name="email"
              value={formData.email}
              type="email"
            />
          </label>
          <label>
            <p>Password</p>
            <input
              required
              onChange={handleInput}
              name="password"
              value={formData.password}
              type="password"
            />
          </label>
          <button className="signin-form__submit">Submit</button>
        </form>

        <div className="signin-form__misc">
          <p>
            Need an account?{" "}
            <a href="./signup" className="signin-form__misc--link">
              Sign Up
            </a>
          </p>
          <p>
            Forgot Password?{" "}
            <a href="./reset-password" className="signin-form__misc--link">
              Reset it
            </a>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}

const mapDispatch = {
  setUserState,
  getUserDetails,
  handleAuthState,
};

export default connect(null, mapDispatch)(Login);
