const initialState = {
  activeLevel: 100,
  isEditing: false,
  courseBeingEdited: {},
};

const componentActivityReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ACTIVE_LEVEL": {
      return {
        ...state,
        activeLevel: action.payload.activeLevel,
      };
    }
    case "TOGGLE_EDITING": {
      return {
        ...state,
        isEditing: action.payload.isEditing,
      };
    }
    case "FILL_EDIT_FORM": {
      const { id, semester, level, name, grade, units } = action.payload;
      return {
        ...state,
        courseBeingEdited: {
          id,
          semester,
          level,
          name,
          grade,
          units,
        },
      };
    }
    default: {
      return state;
    }
  }
};

export default componentActivityReducer;
