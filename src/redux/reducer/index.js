import { combineReducers } from "redux";
import studentDetailsReducer from "./student-details-reducer";
import authReducer from "./auth-reducer";
import componentActivity from "./component-activity-reducer";

const rootReducer = combineReducers({
  studentDetails: studentDetailsReducer,
  auth: authReducer,
  componentActivity: componentActivity,
});

export default rootReducer;
