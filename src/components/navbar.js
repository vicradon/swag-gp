import React, { useRef } from 'react'
import '../css/mdi/mdi.css'
import '../css/nav-aside.css'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { auth } from '../firebase/index'
import { useHistory } from 'react-router-dom'
import { handleAuthState } from '../redux/actions/authActions'
const mapState = state => {
  return {
    isLoggedIn: state.auth.isLoggedIn
  };
}

const mapDispatch = {
  handleAuthState

}

function Navbar({ isLoggedIn, handleAuthState }) {
  const history = useHistory();

  const signOut = () => {
    auth.signOut()
      .then(() => {
        handleAuthState(false)
        history.push('/pages/auth/signout')
      })
  }

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
        <div className="close-side-nav">
          <p className='close-button'>
            <i onClick={closeNav} className="material-icons">close</i>
          </p>

        </div>
        <div className="user-details">
          <p className="username">Username</p>
          <i className="material-icons user-icon">person_pin</i>
        </div>
        <p className="hor-line" style={{ border: "1px solid var(--primary-color)", margin: "2rem 0" }}></p>
        <div className='side-nav-links'>
          <Link className="side-nav-link" to="/pages/about">ABOUT</Link>
          <Link className="side-nav-link auth-page" to="/pages/auth/signin">LOGIN/SIGNUP</Link>
        </div>
      </div>
    )
  }

  const SignedInLinks = () => {
    return (
      <>
        <Link onClick={signOut} className="nav-link logout-page" to="/pages/logout">LOGOUT</Link>
        <i id="user-icon" className="material-icons">person_pin</i>
      </>
    )
  }
  const SignedOutLinks = () => {
    return (
      <>
        <Link className="nav-link auth-page" to="/pages/auth/signin">LOGIN/SIGNUP</Link>
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

        <p id="swag-gp-logo"><Link style={{ color: 'var(--primary)', textDecoration: 'none' }} to='/'>SWAG-GP</Link></p>
        <div className="user-actions">
          <Link className="nav-link" to="/pages/about">ABOUT</Link>
          {/* <Link  to = "/pages/donate">DONATE</Link> */}
          {
            isLoggedIn ?
              <SignedInLinks /> :
              <SignedOutLinks />
          }
        </div>
      </nav>
      <SideNav />
    </>
  )
}


export default connect(mapState, mapDispatch)(Navbar)