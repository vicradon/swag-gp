import React, { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import Icons from "../../components/icons.jsx";
import colors from "../../utils/colors.js";

function Navbar({ drawerVisible, setDrawerVisible }) {
  return (
    <div className="w-100 text-dark bg-dark p-3 shadow d-flex justify-content-between">
      <img
        onClick={() => setDrawerVisible(!drawerVisible)}
        src={Icons.menu}
        alt="menu"
      />
      <span className="text-white">SwagGP</span>
    </div>
  );
}

export default Navbar;

// <NavLink activeClassName="bg-primary" className="p-2 text-center" to="/">
// <Icons.LevelsSvg color="red" />
// <p className="text-white small mb-0">Levels</p>
// </NavLink>
// <NavLink
// activeClassName="bg-primary"
// className="p-2 text-center"
// to="/profile"
// >
// <Icons.LevelsSvg />
// <p className="text-white small mb-0">Profile</p>
// </NavLink>
