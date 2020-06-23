import React from 'react';
import { FaUser, FaTachometerAlt, FaUsers } from 'react-icons/fa';
import PropTypes from 'prop-types';
import AsideButton from './AsideButton';

const AsideLinks = ({ activeButton, setActiveButton }) => {
  return (
    <>
      <AsideButton
        link="/"
        icon={FaTachometerAlt}
        value="Overview"
        isActive={activeButton}
        setActiveButton={setActiveButton}
      />
      <AsideButton
        link="/levels"
        icon={FaUsers}
        value="Levels"
        isActive={activeButton}
        setActiveButton={setActiveButton}
      />
      <AsideButton
        link="/profile"
        icon={FaUser}
        value="Profile"
        isActive={activeButton}
        setActiveButton={setActiveButton}
      />
    </>
  );
};

AsideLinks.propTypes = {
  activeButton: PropTypes.string,
  setActiveButton: PropTypes.func
};

export default AsideLinks;
