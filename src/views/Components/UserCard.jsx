import React from 'react';
import { Flex, Avatar, Grid, Text } from '@chakra-ui/core';
import PropTypes from 'prop-types';

const UserCard = ({ avatarLink, name, category }) => {
  return (
    <Grid boxShadow="sm" bg="white" flexBasis="20px" m="1rem" p="1rem" rounded="md"  columnGap="1rem" templateColumns="50px 200px">
      <Avatar name={avatarLink} />
      <Flex direction="column">
        <Grid columnGap="10px">
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

UserCard.propTypes = {
  avatarLink: PropTypes.string,
  name: PropTypes.string,
  category: PropTypes.string
};

export default UserCard;
