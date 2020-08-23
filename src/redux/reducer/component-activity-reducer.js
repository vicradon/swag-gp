const initialState = {
  activeLevel: 100,
  isEditing: false,
  courseBeingEdited: {},
  semesterBeingEdited: "",
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
        semesterBeingEdited: action.payload.semester,
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
    case "SET_REDUX_STORE_DATA": {
      return {
        ...state,
        ...action.payload.data.componentActivity,
      };
    }
    case "SWITCH_LEVEL": {
      return {
        ...state,
        activeLevel: action.payload.level,
      };
    }
    case "DELETE_LEVEL": {
      return {
        ...state,
        activeLevel: Number(action.payload.level) - 100,
      };
    }
    default: {
      return state;
    }
  }
};

export default componentActivityReducer;
