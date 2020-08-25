import { combineReducers } from "redux";
import levelsReducer from "./levels-reducer";
import authReducer from "./auth-reducer";
import componentActivity from "./component-activity-reducer";
import cumulativeReducer from "./cumulative-reducer";

const rootReducer = combineReducers({
  levels: levelsReducer,
  auth: authReducer,
  componentActivity: componentActivity,
  cumulative: cumulativeReducer
});

export default rootReducer;
