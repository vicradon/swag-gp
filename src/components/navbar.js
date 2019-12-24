import React, { useRef } from 'react'
import '../css/mdi/mdi.css'
import '../css/nav-aside.css'
import { connect } from 'react-redux'
import {auth} from '../firebase/index'

function Navbar() {

  function openNav() {
    sideNav.current.classList.add('is-nav-open');
  }
  function closeNav() {
    sideNav.current.classList.remove('is-nav-open');
  }
  /* DO NOT DELETE THIS COMMENT! */

  // const bodyClickClose = () => {
  //   const body = document.querySelector('body');
  //   body.addEventListener('click', event => {
  //     // const a = (stuff) => event.target.classList.contains(stuff);
  //     // if (!(
  //     //   a('side-menu') ||
  //     //   a('close-menu-cont') ||`
  //     //   a('user-details') ||
  //     //   a('user-icon') ||
  //     //   a('hor-line') ||
  //     //   a('username') ||
  //     //   a('side-menu-links')
  //     // )) closeNav();
  //     console.log(event.target.style.zIndex)

  //     if (event.target.tagName === 'main'){
  //       console.log(event.target)
  //       closeNav()
  //     }
  //   })
  // }
  // bodyClickClose();
  const sideNav = useRef(null);

  const SideNav = () => {

    return (
      <div ref={sideNav} className="side-nav">
        <div className = "close-side-nav">
          <p className = 'close-button'>
            <i onClick = {closeNav} className = "material-icons">close</i>
          </p>
        
        </div>
        <div className="user-details">
          <p className="username">Username</p>
          <i className="material-icons user-icon">person_pin</i>
        </div>
        <p className="hor-line" style={{ border: "1px solid var(--primary-color)", margin: "2rem 0" }}></p>
        <div className='side-nav-links'>
          <a className="side-nav-link" href="/pages/about">ABOUT</a>
          <a className="side-nav-link auth-page" href="/pages/auth/signin">LOGIN/SIGNUP</a>
        </div>
      </div>
    )
  }

  const SignedInLinks = () => {
    return (
      <>
        <a className="nav-link logout-page" href="/pages/logout">LOGOUT</a>
      </>
    )
  }
  const SignedOutLinks = () => {
    return (
      <>
        <a className="nav-link auth-page" href="/pages/auth/signin">LOGIN/SIGNUP</a>
        <i id="user-icon" className="material-icons">person_pin</i>
      </>
    )
  }
  return (
    <>
      <nav>
        <p className="invisible">
          <i onClick={openNav} style={{ color: "white" }} className="material-icons">menu</i>
        </p>

        <p id="swag-gp-logo">SWAG-GP</p>
        <div className="user-actions">
          <a className="nav-link" href="/pages/about">ABOUT</a>
          {/* <a  href = "/pages/donate">DONATE</a> */}
          {
            auth.currentUser !== null?
              SignedInLinks():
              SignedOutLinks()
          }
        </div>
      </nav>
      <SideNav />
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    // auth: state.firebase.auth,
    // profile: state.firebase.profile
  }
}

export default connect(mapStateToProps)(Navbar)