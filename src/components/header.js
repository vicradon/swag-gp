import React from 'react'
// import styled from 'styled-components'
import '../css/mdi/mdi.css'
import '../css/header-aside.css'
export default function Header(){

 

  return (
    <header>
      <p className="invisible">
        <i style={{color: "white"}} className="material-icons">menu</i>
      </p>
      <p id="swag-gp-logo">SWAG-GP</p>
      <div className="user-actions">
        <a id="about" href = "./pages/about">ABOUT</a>
        {/* <a id="donate" href = "./pages/donate">DONATE</a> */}
        <i id="user-icon" className="material-icons">person_pin</i>
      </div>
    </header>
  )
}