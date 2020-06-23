import React from 'react';
import { Flex, Text, Box } from '@chakra-ui/core';
import { useDispatch } from 'react-redux';
// import { useAuth0 } from '../../react-auth0-spa';

import SummaryCards from './SummaryCards';

const AdminDashboard = () => {
  // const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch({ type: 'FETCH_USER_DETAILS' });
  });
  return (
    <Box>
      <Flex justify="space-between">
        <Text fontSize="2xl">Dashboard</Text>
      </Flex>
      <SummaryCards />
    </Box>
  );
};

export default AdminDashboard;

// key: fnADvA5wRyACB1jjFJU1AyRYxL7WbQMe8yOYOE7K
// secret: fnADvA6J-rACBfTpmAu1Dst6D2ZVg0i7IAdhQ6yK
