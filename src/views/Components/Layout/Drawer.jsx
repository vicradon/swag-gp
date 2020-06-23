import React from "react";
import { Drawer, DrawerOverlay, DrawerContent } from "@chakra-ui/core";
import PropTypes from 'prop-types';
import Aside from "./Aside";

const CustomDrawer = ({ isOpen, onClose }) => {
  return (
    <Drawer placement={"left"} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <Aside closeButton = {true} onClose = {onClose} width="100%" />
      </DrawerContent>
    </Drawer>
  );
};

CustomDrawer.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func
};
export default CustomDrawer;
