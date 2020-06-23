import { navigate } from '@reach/router';
import store from '../../state/store';
import { remove } from '../utils/easy-storage';

const signOut = () => {
  remove('token');
  remove('smefund-user');
  navigate('/');
  store.dispatch({ type: 'SIGN_OUT' });
};

export default signOut;
