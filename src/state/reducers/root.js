import { combineReducers } from 'redux';
import main from './main';
import resize from './resize';
import auth from './auth';

const rootReducer = combineReducers({ main, resize, auth });
export default rootReducer;
