import React, {useRef} from 'react'
import AuthLayout from '../AuthLayout'
import { Link } from 'react-router-dom'

export default function SignOut() {
  const style = {
    padding: "2rem 1rem",
    display: "grid",
    rowGap: "2rem"
  }
  const style2 = {
    textDecoration: 'none',
    color: '#000'
  }
  const style3 = {
    textDecoration: "underline",
    color: '#000',
    cursor: "pointer"
  }

  const link = useRef(null);
  return (
    <AuthLayout>
      <div style={style}>
        <h2>You've successfully logged out</h2>
        <p>Was this a mistake? <Link ref = {link} onMouseEnter={() => link.current.style = style3 } onMouseLeave ={() => link.current.style = style2 } style={style2} to='/pages/auth/signin' >Log in again</Link></p>
      </div>

    </AuthLayout>
  )
}