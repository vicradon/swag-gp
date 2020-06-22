import React from 'react';
import { Text, Box, Flex } from '@chakra-ui/core';
import PropTypes from 'prop-types';

const FilterFields = ({ children, name }) => {
  return (
    <Box my="2rem">
      <Text my=".5rem" color="blue" fontSize="0.9em">
        {name}
      </Text>
      <Flex justify="space-between" wrap="wrap">
        {children}
      </Flex>
    </Box>
  );
};

FilterFields.propTypes = {
  children: PropTypes.object,
  name: PropTypes.string
};

export default FilterFields;
