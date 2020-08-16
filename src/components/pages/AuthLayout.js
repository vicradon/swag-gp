import React from 'react'
import '../../css/auth.css'

export default function AuthLayout({children}) {
  return (
    <div className="auth-page">
      <div className="auth-container">
        { children }
      </div>
    </div>
  )
}
