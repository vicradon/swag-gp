import { navigate } from '@reach/router';

const initialState = {
  isAuthenticated: localStorage.getItem('token'),
  user: {}
};
const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTHENTICATE_USER': {
      localStorage.setItem('smefund-user', JSON.stringify(action.userDetails.data.data));
      localStorage.setItem('token', JSON.stringify(action.response.data.data.token));
      navigate(`/`);
      return { ...state, isAuthenticated: true, user: action.userDetails.data.data };
    }
    case 'GET_USER_DETAILS': {
      return { ...state, user: action.user };
    }
    case 'SIGN_OUT':
      return { ...state, isAuthenticated: false };
    default: {
      return state;
    }
  }
};

export default auth;
