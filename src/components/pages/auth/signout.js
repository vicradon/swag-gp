import React, {useRef} from 'react'
import AuthLayout from '../AuthLayout'

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
        <p>Was this a mistake? <a ref = {link} onMouseEnter={() => link.current.style = style3 } onMouseLeave ={() => link.current.style = style2 } style={style2} href='./signin' >Log in again</a></p>
      </div>

    </AuthLayout>
  )
}//this.style = style3