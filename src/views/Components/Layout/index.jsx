import React from 'react';
import Media from 'react-media';
import { Box, useColorMode } from '@chakra-ui/core';
import PropTypes from 'prop-types';
import Aside from './Aside/Aside';
import NavBar from './NavBar';

const Layout = ({ children }) => {
  const { colorMode } = useColorMode();

  const myBgColor = {
    light: '#eef4f8',
    dark: '#1a202c'
  };

  const TabletAndMobile = () => (
    <Box>
      <NavBar />
      <Box background={myBgColor[colorMode]} padding="1rem">
        <Box>{children}</Box>
      </Box>
    </Box>
  );

  const Desktop = () => (
    <Box>
      <Aside />
      <Box background={myBgColor[colorMode]} height="100%" marginLeft="200px" padding="1rem">
        <Box>{children}</Box>
      </Box>
    </Box>
  );

  return (
    <Media queries={{ medium: { maxWidth: 768 } }}>
      {(matches) => (matches.medium ? <TabletAndMobile /> : <Desktop />)}
    </Media>
  );
};

Layout.propTypes = {
  children: PropTypes.object
};

export default Layout;
