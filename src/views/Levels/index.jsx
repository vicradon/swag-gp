import React from 'react';
import { Flex, Text, Box } from '@chakra-ui/core';
import SMEList from './SMEList';
// import Header from "./Header";

const SMEs = () => {
  return (
    <>
      <Flex justify="space-between">
        <Text fontSize="2xl">SMEs</Text>
        <Box />
      </Flex>
      <SMEList />
    </>
  );
};

export default SMEs;
