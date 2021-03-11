import React, { useState, useRef } from "react";
// import firebase, { auth, db } from "../../../firebase/index";
import AuthLayout from "../AuthLayout";
// import TwitterIcon from './twitter-icon'
import { snack } from "../../../redux/utility-functions";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignUp() {
  const initialState = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialState);
  const handleInput = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const [passwordType, setPasswordType] = React.useState("password");
  const handleSubmit = (event) => {
    event.preventDefault();
    // auth
    //   .createUserWithEmailAndPassword(formData.email, formData.password)
    //   .then(() => {
    //     const user = auth.currentUser;
    //     return db
    //       .collection("users")
    //       .doc(user.uid)
    //       .set({
    //         profile: {
    //           displayName: `${formData.firstname} ${formData.lastname}`,
    //         },
    //       })
    //       .catch((err) =>
    //         console.log("Error occured while saving user data", err)
    //       );
    //   })
    //   .then(() => {
    //     setFormData(initialState);
    //     snack("Sign up successful");
    //     window.location.href = "/";
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     snack(err.message);
    //   });
  };
  const togglePasswordVisibility = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };
  const passwordField = useRef(null);

  const handleSignups = (provider) => {
    // auth.signInWithPopup(provider).then((result) => {
    //   // This gives you a Google Access Token. You can use it to access the Google API.
    //   // const token = result.credential.accessToken;
    //   // The signed-in user info.
    //   const user = result.user;
    //   db.collection("users")
    //     .doc(user.uid)
    //     .set({
    //       profile: {
    //         displayName: user.displayName,
    //         photoURL: user.photoURL,
    //       },
    //     })
    //     .then(() => {
    //       snack("Sign up successful");
    //       window.location.href = "/";
    //     })
    //     .catch((err) => {
    //       snack(err.message);
    //       throw new Error(err.message);
    //     });
    // });
  };

  // const handleGoogleSignup = () => {
  //   const provider = new firebase.auth.GoogleAuthProvider();
  //   handleSignups(provider);
  // };

  return (
    <AuthLayout>
      <style>
        {`
          .password-eye {
            border: 1px solid var(--primary);
            border-left: 0;
            padding: 3.5px 0;
          }
        `}
      </style>
      <div className="signin-form">
        <h3>Create a Swag-GP account</h3>
        <div className="oauth">
          <h4>Create an account with</h4>
          <div className="auth-buttons">
            <div className="auth-btn">
              <div className="auth-icon-wrapper">
                <img
                  className="auth-icon-svg"
                  alt="Google logo"
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                />
              </div>
              <p className="btn-text">
                <b>Sign up with Google</b>
              </p>
            </div>
          </div>
        </div>
        <h4>Or do it the old fashioned way</h4>
        <form onSubmit={handleSubmit}>
          <label>
            <p>First Name</p>
            <input
              name="firstname"
              onChange={handleInput}
              required
              value={formData.firstname}
              type="text"
            />
          </label>
          <label>
            <p>Last Name</p>
            <input
              name="lastname"
              onChange={handleInput}
              required
              value={formData.lastname}
              type="text"
            />
          </label>
          <label>
            <p>Email</p>
            <input
              name="email"
              onChange={handleInput}
              required
              value={formData.email}
              type="email"
            />
          </label>
          <label>
            <p>Password</p>
            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                ref={passwordField}
                className="password-input"
                name="password"
                onChange={handleInput}
                required
                value={formData.password}
                type={passwordType}
              />
              <div className="password-eye">
                {passwordType === "password" ? (
                  <FaEye onClick={togglePasswordVisibility} />
                ) : (
                  <FaEyeSlash onClick={togglePasswordVisibility} />
                )}
              </div>
            </div>
          </label>
          <button className="signin-form__submit">Submit</button>
        </form>

        <div className="signin-form__misc">
          <p>
            Already have an account?{" "}
            <a href="./signin" className="signin-form__misc--link">
              Login
            </a>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
}
