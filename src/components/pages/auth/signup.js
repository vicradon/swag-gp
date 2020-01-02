import React, { useState, useRef } from 'react'
import firebase, { auth, db } from '../../../firebase/index'
import AuthLayout from '../AuthLayout'
// import TwitterIcon from './twitter-icon'
import { snack } from '../../../redux/utility-functions'

export default function SignUp() {
  const initialState = {
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  }
  const [formData, setFormData] = useState(initialState)
  const handleInput = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }
  const handleSubmit = event => {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(formData.email, formData.password)
      .then(() => {
        const user = auth.currentUser;
        return db.collection('users').doc(user.uid).set({
          profile: {
            displayName: `${formData.firstname} ${formData.lastname}`
          }
        }).catch(err => console.log("Error occured while saving user data", err))
      })
      .then(() => {
        setFormData(initialState)
        snack('Sign up successful')
        window.location.href = '/'

      })
      .catch(err => {
        console.log(err)
        snack(err.message)
      })
  }
  const togglePasswordVisibility = () => {
    passwordField.current.type === 'password' ?
      passwordField.current.type = 'text' :
      passwordField.current.type = 'password'
  }
  const passwordField = useRef(null)

  const handleSignups = (provider) => {
    auth.signInWithPopup(provider).then(result => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      // const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;

      db.collection('users').doc(user.uid).set({
        profile: {
          displayName: user.displayName,
          photoURL: user.photoURL
        }
      }).then(() => {
        snack("Sign up successful")
        window.location.href = '/'

      }).catch(err => {
        snack(err.message)
        throw new Error(err.message)
      })
    })
  }

  const handleGoogleSignup = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    handleSignups(provider)
  }
  // const handleTwitterSignup = () => {
  //   const provider = new firebase.auth.TwitterAuthProvider();
  //   handleSignups(provider)
  // }

  return (
    <AuthLayout>
      <div className="signin-form">
        <h3>Create a Swag-GP account</h3>
        <div className="oauth">
          <h4>Create an account with</h4>
          <div className="auth-buttons">
            <div onClick={handleGoogleSignup} className="auth-btn">
              <div className="auth-icon-wrapper">
                <img className="auth-icon-svg" alt="Google logo" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
              </div>
              <p className="btn-text"><b>Sign up with Google</b></p>
            </div>

            {/* DO NOT DELETE THIS COMMENT! */}
            {/* <div onClick={handleTwitterSignup} className="auth-btn">
              <div className="auth-icon-wrapper">
                <TwitterIcon />
              </div>
              <p className="btn-text"><b>Sign up with Twitter</b></p>
            </div> */}
          </div>
        </div>
        <h4>Or do it the old fashioned way</h4>
        <form onSubmit={handleSubmit}>
          <label>
            <p>First Name</p>
            <input name="firstname" onChange={handleInput} required value={formData.firstname} type="text" />
          </label>
          <label>
            <p>Last Name</p>
            <input name="lastname" onChange={handleInput} required value={formData.lastname} type="text" />
          </label>
          <label>
            <p>Email</p>
            <input name="email" onChange={handleInput} required value={formData.email} type="email" />
          </label>
          <label>
            <p>Password</p>
            <p style={{ display: 'flex', alignItems: 'center' }}><input ref={passwordField} className="password-input" name="password" onChange={handleInput} required value={formData.password} type="password" /><i onClick={togglePasswordVisibility} className="toggle-password material-icons">remove_red_eye</i></p>
          </label>
          <button className="signin-form__submit" >Submit</button>
        </form>

        <div className="signin-form__misc">
          <p>Already have an account? <a href='./signin' className="signin-form__misc--link" >Log In</a></p>
        </div>
      </div>
    </AuthLayout>
  )
}