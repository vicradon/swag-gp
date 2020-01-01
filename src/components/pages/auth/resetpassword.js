import React, { useState } from 'react'
import AuthLayout from '../AuthLayout'

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const handleSubmit = event => {
    event.preventDefault();
  }
  const handleChange = event => setEmail(event.target.value)
  return (
    <AuthLayout>
      <div className="signin-form">
        <h3>Reset your password</h3>
        <p>We'd send you an email with the reset link</p>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Email</p>
            <input onChange = {handleChange} value = {email} type="email" />
          </label>
          <button className="signin-form__submit" >Submit</button>
        </form>

        <div className="signin-form__misc">
          <p>Didn't Forget Password? <a href='./signin' className="signin-form__misc--link" >Then Log in</a></p>
        </div>

      </div>
    </AuthLayout>
  )
}