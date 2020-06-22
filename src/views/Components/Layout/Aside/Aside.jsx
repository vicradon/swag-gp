import React from 'react';
import { Box, Flex, Text, LightMode, CloseButton, Grid } from '@chakra-ui/core';
import PropTypes from 'prop-types';

import { FaSignOutAlt, FaCog } from 'react-icons/fa';
import AsideButton from './AsideButton';
import AsideLinks from './AsideLinks';
import signOut from '../../../http/sign_out';
// import bg from '../../images/sidebar-2.jpg';


const Aside = ({ width, closeButton, onClose }) => {
  const [activeButton, setActiveButton] = React.useState(window.location.pathname);
  return (
    <Box
      backgroundPosition="cover"
      backgroundRepeat="no-repeat"
      backgroundAttachment="fixed"
      // backgroundImage={`url(${bg})`}
      overflow="auto"
      width={width || '200px'}
      position="fixed"
      height="100%"
    >
      <LightMode>
        <Flex height="60px" bg="gray.600" justify="space-evenly" align="center">
          <Text color="white" fontSize="2xl">
            SMEFund
          </Text>
          {closeButton && <CloseButton color="white" onClick={onClose} />}
        </Flex>
      </LightMode>

      <Grid rowGap="50%">
        <Grid rowGap="2rem" padding="1rem">
          <AsideLinks activeButton={activeButton} setActiveButton={setActiveButton} />
        </Grid>

        <Box padding="1rem">
          <AsideButton
            link="/settings"
            icon={FaCog}
            value="Settings"
            isActive={activeButton}
            setActiveButton={setActiveButton}
          />
          <Grid onClick={() => signOut()} cursor="pointer" rounded="md" p="10px" alignContent="center" templateColumns="1fr 4fr">
            <Box color="gray.600" w="20px" h="20px" alignSelf="center" as={FaSignOutAlt} />
            <Text>Sign out</Text>
          </Grid>
        </Box>
      </Grid>
    </Box>
  );
};

Aside.propTypes = {
  width: PropTypes.string,
  closeButton: PropTypes.bool,
  onClose: PropTypes.func
};

export default Aside;
