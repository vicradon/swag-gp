import React, { useState } from 'react'
import AuthLayout from '../AuthLayout'
// import TwitterIcon from './twitter-icon'
import firebase, { auth } from '../../../firebase/index'
import { snack } from '../../../redux/utility-functions'
import { connect } from 'react-redux'
import { handleAuthState } from '../../../redux/actions/authActions'
import { useHistory } from 'react-router-dom'


const mapDispatch = {
  handleAuthState
}

function SignIn({handleAuthState}) {
  const history = useHistory();

  const initialFormState = {
    email: '',
    password: ''
  }
  const [formData, setFormData] = useState(initialFormState)
  const handleInput = event => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }
  const handleSubmit = event => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(formData.email, formData.password)
      .then(cred => {
        console.log(cred)
        setFormData(initialFormState)
        snack("Login successful!")
        handleAuthState(true);
        history.push('/')
      })
      .catch(err => {
        console.log(err)
        snack(err.message)
      })
  }
  const handleSignin = (provider) => {
    auth.signInWithPopup(provider)
      .then(() => {
        snack('Login succesful!')
        handleAuthState(true);
        history.push('/')
      })
      .catch(err => {
        console.log(err)
        snack(err.message)
      })
  }
  const handleGoogleSignin = (pr) => {
    const provider = new firebase.auth.GoogleAuthProvider();
    handleSignin(provider)
  }

  return (
    <AuthLayout>
      <div className="signin-form">
        <h3>Sign In to Swag-GP</h3>
        <div className="oauth">
          <h4>Sign in with</h4>
          <div className="auth-buttons">
            <div onClick={handleGoogleSignin} className="auth-btn">
              <div className="auth-icon-wrapper">
                <img alt="Google logo" className="auth-icon-svg" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
              </div>
              <p className="btn-text"><b>Sign in with Google</b></p>
            </div>
            {/* DO NOT DELETE THIS COMMENT! */}
            {/* <div className="auth-btn">
              <div className="auth-icon-wrapper">
                <TwitterIcon />
              </div>
              <p className="btn-text"><b>Sign in with Twitter</b></p>
            </div> */}
          </div>
        </div>
        <h4>Or sign in with email</h4>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Email</p>
            <input required onChange={handleInput} name='email' value={formData.email} type="email" />
          </label>
          <label>
            <p>Password</p>
            <input required onChange={handleInput} name='password' value={formData.password} type="password" />
          </label>
          <button className="signin-form__submit" >Submit</button>
        </form>

        <div className="signin-form__misc">
          <p>Need an account? <a href='./signup' className="signin-form__misc--link" >Sign Up</a></p>
          <p>Forgot Password? <a href='./reset-password' className="signin-form__misc--link" >Reset it</a></p>
        </div>
      </div>
    </AuthLayout>
  )
}

export default connect(null, mapDispatch)(SignIn);