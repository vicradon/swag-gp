import { combineReducers } from "redux";
import levelsReducer from "./levels-reducer";
import authReducer from "./auth-reducer";
import activeComponentsReducer from "./active-components-reducer";

const rootReducer = combineReducers({
  levels: levelsReducer,
  auth: authReducer,
  activeComponents: activeComponentsReducer
});

export default rootReducer;
