import React from 'react';
import { Flex, Input, Button, useDisclosure } from '@chakra-ui/core';
import { useSelector } from 'react-redux';
import FilterDrawer from './FilterDrawer';


const Header = () => {
  const { width } = useSelector((state) => state.resize);
  const { isOpen: filterIsOpen, onOpen: filterOnOpen, onClose: filterOnClose } = useDisclosure();

  return (
    <Flex my="1rem" className="transactionHeader">
      <style>{`.transactionHeader *:not(:last-child) { margin-right: 1rem}`}</style>
      <Input placeholder="eggs and ham" />

      {width > 900 ? '' : <Button onClick={filterOnOpen}>Filters</Button>}
      <FilterDrawer isOpen={filterIsOpen} onClose={filterOnClose} />
    </Flex>
  );
};

export default Header;
