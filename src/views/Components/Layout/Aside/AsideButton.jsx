import React from 'react';
import { Box, Text, Grid, useTheme } from '@chakra-ui/core';
import PropTypes from 'prop-types';

import { Link } from '@reach/router';

const AsideButton = ({ link, icon, value, isActive, setActiveButton }) => {
  const theme = useTheme();
  const primaryColor = theme.colors.asideButton;
  return (
    <Link to={link}>
      <Grid
        onClick={() => setActiveButton(link)}
        rounded="md"
        p="10px"
        alignContent="center"
        templateColumns="1fr 4fr"
        background={link === isActive && { primaryColor }}
      >
        <Box w="20px" h="20px" color={link === isActive ? 'white' : 'gray.600'} alignSelf="center" as={icon} />
        <Text color={link === isActive ? 'white' : 'gray.600'}>{value}</Text>
      </Grid>
    </Link>
  );
};

AsideButton.propTypes = {
  link: PropTypes.string,
  icon: PropTypes.func,
  value: PropTypes.string,
  isActive: PropTypes.string,
  setActiveButton: PropTypes.func
};

export default AsideButton
