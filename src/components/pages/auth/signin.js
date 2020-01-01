import React from 'react'
import AuthLayout from '../AuthLayout'
import TwitterIcon from './twitter-icon'

export default function SignIn() {
  return (
    <AuthLayout>
      <div className="signin-form">
        <h3>Sign In to Swag-GP</h3>
        <div className="oauth">
          <h4>Sign in with</h4>
          <div className="auth-buttons">
            <div className="auth-btn">
              <div className="auth-icon-wrapper">
                <img alt = "Google logo" className="auth-icon-svg" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
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
        <h4>Or sign in with email</h4>
        <form>
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
          <p>Need an account? <a href='./signup' className="signin-form__misc--link" >Sign Up</a></p>
          <p>Forgot Password? <a href='./reset-password' className="signin-form__misc--link" >Reset it</a></p>
        </div>
      </div>
    </AuthLayout>
  )
}