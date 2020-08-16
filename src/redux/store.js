import { createStore, combineReducers } from "redux";
import dataReducer from "./data-reducer";
import authReducer from './auth-reducer';

const rootReducer = combineReducers({
  data: dataReducer,
  auth: authReducer
})

const store = createStore(rootReducer)

export default store;
