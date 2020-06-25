/* eslint-disable no-console */
/* eslint-disable consistent-return */
import { getDoc, createDoc } from '../../services/db';

const db = (state = {}, action) => {
  switch (action.type) {
    case 'FETCH_APP_STATE':
      {
        const { loading, user, isAuthenticated } = action.payload;
        if (!loading && user && isAuthenticated) {
          getDoc(user.email)
            .then((res) => {
              if (Object.keys(res).length === 0) {
                createDoc({ user: { email: user.email, name: user.name } }).catch(console.error);
              } else {
                return res;
              }
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }
      break;
    default:
      return state;
  }
};

export default db;
