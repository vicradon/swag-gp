import { studentGpa } from "./levels-reducer";

const cumulativeReducer = (state = studentGpa.cumulative, action) => {
  switch (action.type) {
    case "GET_CUMULATIVE": {
      return studentGpa.cumulative
    }
    default: {
      return state;
    }
  }
};

export default cumulativeReducer;
