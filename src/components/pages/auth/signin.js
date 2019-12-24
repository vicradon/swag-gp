import React from 'react'
import AuthLayout from '../AuthLayout'

export default function SignIn() {
  return (
    <AuthLayout>
      <div className="signin-form">
        <h3>Sign In to Swag-GP</h3>
        <label>
          <p>Email</p>
          <input type="email" />
        </label>
        <label>
          <p>Password</p>
          <input type="password" />
        </label>
        <button className="signin-form__submit" >Submit</button>

        <div className="signin-form__misc">
          {/* <p>Need an account? <button onClick={() => handleSignin(false)}>Sign Up</button></p>
        <p>Need an account? <button onClick={() => handleSignin(false)}>Sign Up</button></p> */}
        </div>
      </div>
    </AuthLayout>
  )
}