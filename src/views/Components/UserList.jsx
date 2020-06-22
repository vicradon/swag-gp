import React from 'react';
import { Flex } from '@chakra-ui/core';
import PropTypes from 'prop-types';
import UserCard from './UserCard';
import getUsers from '../http/get_users';


const UserList = ({ userType }) => {
  const [users, updateUsers] = React.useState();
  React.useEffect(() => {
    (async () => {
      const res = await getUsers(userType);
      updateUsers(res.data.data);
    })();
  }, []);

  return (
    <Flex justifyContent="space-around" flexWrap="wrap">
      {users
        ? users.map((x, i) => {
            return <UserCard key={i} name={x.name} avatarLink={x.avatarLink} category={x.category} />;
          })
        : 'loading'}
    </Flex>
  );
};

UserList.propTypes = {
  userType: PropTypes.string
};

export default UserList;
