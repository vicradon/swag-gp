import React, { useRef } from 'react'
import '../css/mdi/mdi.css'
import '../css/header-aside.css'
export default function Header() {

  function openMenu(){
    sideMenu.current.classList.add('is-nav-open');
  }
  function closeMenu(){
    sideMenu.current.classList.remove('is-nav-open');
  }
  const bodyClickClose = () => {
    const body = document.querySelector('body');
    body.addEventListener('click', event => {
      const a = (stuff) => event.target.classList.contains(stuff);
      if (!(
        a('side-menu') ||
        a('close-menu-cont') ||
        a('user-details') ||
        a('user-icon') ||
        a('username') ||
        a('side-menu-links')
      )) closeMenu();
    })
  }
  bodyClickClose();
  const sideMenu = useRef(null);

  const SideMenu = () => {

    return (
      <div ref = {sideMenu} className="side-menu">
        <div className="user-details">
          <p className = "username">Username</p>
          <i className="material-icons user-icon">person_pin</i>
        </div>
        <p style = {{border: "1px solid var(--primary-color)", margin:"2rem 0"}}></p>
        <div className='side-menu-links'>
          <a href="./pages/about">ABOUT</a>
        </div>
      </div>
    )
  }

  return (
    <>
      <header>
        <p className="invisible">
          <i onClick={ openMenu } style={{ color: "white" }} className="material-icons">menu</i>
        </p>

        <p id="swag-gp-logo">SWAG-GP</p>
        <div className="user-actions">
          <a id="about" href="./pages/about">ABOUT</a>
          {/* <a id="donate" href = "./pages/donate">DONATE</a> */}
          <i id="user-icon" className="material-icons">person_pin</i>
        </div>
      </header>
      <SideMenu />
    </>
  )
}