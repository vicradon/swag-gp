import initialState from './initial-state'
import {
  handleCummulative,
  handleEdit,
  handleUpdate,
  handleCancel,
  handleSemesterDetails,
  handleAdd,
  handlePosition,
  handleDelete,
  handleAddNewLevel
} from './utility-functions'

function Reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_CURRENT":
      return {
        ...state,
        currentLevel: state.levels[action.id],
      };

    case 'DELETE_COURSE':
      return handleCummulative(handlePosition(
        state,
        handleDelete(state, action).updatedSemester,
        handleDelete(state, action).otherSemester,
        action
      ))
    case 'EDIT_COURSE':
      return handleCummulative(handlePosition(
        state,
        handleEdit(state, action).updatedSemester,
        handleEdit(state, action).otherSemester,
        action
      ))
    case 'UPDATE_COURSE':
      return handleCummulative(handlePosition(
        state,
        handleUpdate(state, action).updatedSemester,
        handleUpdate(state, action).otherSemester,
        action
      ))
    case 'CANCEL_EDIT':
      return handlePosition(
        state,
        handleCancel(state, action).updatedSemester,
        handleCancel(state, action).otherSemester,
        action
      )
    case 'ADD_NEW_COURSE':
      return handleCummulative(handlePosition(
        state,
        handleAdd(state, action).updatedSemester,
        handleAdd(state, action).otherSemester,
        action
      ))
    case 'UPDATE_SEMESTER_DETAILS':
      return handlePosition(
        state,
        handleSemesterDetails(state, action).updatedSemester,
        handleSemesterDetails(state, action).otherSemester,
        action
      )
    case 'ADD_NEW_LEVEL':
      return handleAddNewLevel(state, action);

    case 'HANDLE_LEVEL_CHANGE':
      return {
        ...state,
        currentLevel: state.levels[action.payload.levelid],
      };
    default:
      return state
  }
}
export default Reducer;
