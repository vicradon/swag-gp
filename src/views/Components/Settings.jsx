import React from 'react';
import { Button, useColorMode, Flex, Text, Box } from '@chakra-ui/core';

const Settings = () => {
  const { toggleColorMode } = useColorMode();
  return (
    <div>
      <Flex justify="space-between">
        <Text fontSize="2xl">Settings</Text>
        <Box />
      </Flex>
      <Box py="2rem">
        <Button bg="#5f8af8" onClick={toggleColorMode}>
          Toggle Dark Mode
        </Button>
      </Box>

      <Flex height="80vh"></Flex>
    </div>
  );
};

export default Settings;
