/* eslint-disable no-console */
import React from 'react';
import { Flex, Text, Box } from '@chakra-ui/core';
// import { useSelector } from 'react-redux';
// import { useAuth0 } from '../../react-auth0-spa';

import SummaryCards from './SummaryCards';

const AdminDashboard = () => {
  // const { user, isAuthenticated, loading } = useAuth0();
  // const userFromState = useSelector((state) => state.db)
  // console.log(userFromState)
  return (
    <Box>
      <Flex justify="space-between">
        <Text fontSize="2xl">Dashboard</Text>
        {/* <p>{!loading && userFromState.name}</p> */}
      </Flex>
      <SummaryCards />
    </Box>
  );
};

export default AdminDashboard;

// key: fnADvA5wRyACB1jjFJU1AyRYxL7WbQMe8yOYOE7K
// secret: fnADvA6J-rACBfTpmAu1Dst6D2ZVg0i7IAdhQ6yK
