import React from 'react';
import { Avatar, Text, Grid, Box, useDisclosure, useColorMode } from '@chakra-ui/core';
import { useSelector } from 'react-redux';
import { FaCamera } from 'react-icons/fa';
import ImgUploadModal from './ImgUploadModal';

const ImageAndStats = () => {
  const { width, bp1 } = useSelector((state) => state.resize);
  const { name } = useSelector((state) => state.auth);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { colorMode } = useColorMode();

  return (
    <Grid margin="0 auto" h="300px" w={width <= bp1 ? '100%' : '300px'} justifyItems="center" rowGap="-10">
      <Box mb="-150.5px" p="1rem" zIndex="2" position="relative">
        <Avatar size="2xl" name={name} />
        <Box
          top="120px"
          left="120px"
          width="25px"
          height="25px"
          color="#777"
          position="absolute"
          zIndex="5"
          shadow="md"
          as={FaCamera}
          onClick={onOpen}
        />
        <ImgUploadModal isOpen={isOpen} onClose={onClose} />
      </Box>
      <Grid
        direction="column"
        pt="100px"
        bg={colorMode === 'light' ? 'white' : 'gray.700'}
        borderTop="none"
        shadow="md"
        borderWidth="1px"
        flex="1"
        rounded="md"
        w="calc(100% - 2rem)"
      >
        <Text textAlign="center">Placeholder name</Text>
        <Text textAlign="center">Placeholder Title</Text>
      </Grid>
    </Grid>
  );
};

export default ImageAndStats;
