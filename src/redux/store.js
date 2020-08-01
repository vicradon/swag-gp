import { createStore, combineReducers } from "redux";
import dataReducer from "./data-reducer";
import authReducer from "./auth-reducer";

const rootReducer = combineReducers({
  data: dataReducer,
  auth: authReducer,
});

const persistedState = localStorage.getItem("reduxState")
  ? JSON.parse(localStorage.getItem("reduxState"))
  : {};

export default createStore(rootReducer, persistedState);
