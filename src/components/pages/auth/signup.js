import React from 'react'
import AuthLayout from '../AuthLayout'
import TwitterIcon from './twitter-icon'

export default function SignUp() {
  return (
    <AuthLayout>
      <div className="signin-form">
        <h3>Create a Swag-GP account</h3>
        <div className="oauth">
          <h4>Create an account with</h4>
          <div className="auth-buttons">
            <div className="auth-btn">
              <div className="auth-icon-wrapper">
                <img className="auth-icon-svg" alt = "Google logo" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
              </div>
              <p className="btn-text"><b>Sign in with Google</b></p>
            </div>

            <div className="auth-btn">
              <div className="auth-icon-wrapper">
                <TwitterIcon />
              </div>
              <p className="btn-text"><b>Sign in with Twitter</b></p>
            </div>
          </div>
        </div>
        <h4>Or do it the old fashioned way</h4>
        <form>
          <label>
            <p>First Name</p>
            <input type="text" />
          </label>
          <label>
            <p>Last Name</p>
            <input type="text" />
          </label>
          <label>
            <p>Email</p>
            <input type="email" />
          </label>
          <label>
            <p>Password</p>
            <input type="password" />
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