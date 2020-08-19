const initialState = {
  activeLevel: 100,
};

const activeComponentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ACTIVE_LEVEL": {
      return {
        ...state,
        activeLevel: action.payload.activeLevel,
      };
    }
    default: {
      return state;
    }
  }
};

export default activeComponentsReducer;
