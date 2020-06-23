import React from 'react';
import { Flex, Avatar, Grid, Text } from '@chakra-ui/core';
import PropTypes from 'prop-types';

const FunderCard = ({ avatarLink, name, category }) => {
  return (
    <Grid columnGap="1rem" templateColumns="50px 200px">
      <Avatar name={avatarLink} />
      <Flex direction="column">
        <Grid templateColumns="100px 100px" columnGap="10px">
          <Text>name</Text>
          <Text fontWeight="semibold">{name}</Text>
        </Grid>
        <Grid templateColumns="100px 100px" columnGap="10px">
          <Text>category</Text>
          <Text fontWeight="semibold">{category}</Text>
        </Grid>
      </Flex>
    </Grid>
  );
};

FunderCard.propTypes = {
  avatarLink: PropTypes.string,
  name: PropTypes.string,
  category: PropTypes.string
};

export default FunderCard;
