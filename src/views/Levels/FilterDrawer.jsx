import React from "react";
import PropTypes from 'prop-types';
import { Drawer, DrawerOverlay, DrawerContent } from "@chakra-ui/core";
import Filters from "./Filters";

const FilterDrawer = ({ isOpen, onClose }) => {
  return (
    <Drawer placement={"right"} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent >
        <Filters closeButton onClose = {onClose} />
      </DrawerContent>
    </Drawer>
  );
};

FilterDrawer.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func
};

export default FilterDrawer;
