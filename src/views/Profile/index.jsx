import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/core';
import Media from 'react-media';

import ImageAndStats from './ImageAndStats';
import DataTable from './DataTable';

const Profile = () => {
  return (
    <Box>
      <Flex justify="space-between">
        <Text fontSize="2xl">User Profile </Text>
        <Box />
      </Flex>

      <Media queries={{ medium: { maxWidth: 768 } }}>
        {(matches) => (
          <Flex direction={matches.medium ? 'column' : 'row'} my="2rem" justify="space-around">
            <DataTable />
            <Box h={['0', '0', '5rem', '5rem']} />
            <ImageAndStats />
          </Flex>
        )}
      </Media>
    </Box>
  );
};

export default Profile;
