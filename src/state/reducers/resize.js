const initialState = {
  width: window.innerWidth,
  height: window.innerHeight,
  bp1: 900,
  bp2: 768
};

const resize = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_WINDOW_SIZE": {
      return { ...state, ...action.payload };
    }
    default: {
      return state;
    }
  }
};

export default resize;
