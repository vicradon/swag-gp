import React from 'react';
import { Flex, Text, Box } from '@chakra-ui/core';
import { useDispatch } from 'react-redux';

import SummaryCards from './SummaryCards';

const AdminDashboard = () => {
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
