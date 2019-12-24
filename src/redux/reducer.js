// import initialState from './initial-state';
import {
  handleCummulative,
  handleEdit,
  handleUpdate,
  handleCancel,
  handleSemesterDetails,
  handleAdd,
  handlePosition,
  handleDelete,
  handleAddNewLevel,
  handleDeleteSemester,
  setCurrentUsingLevel,
  arrangeLevel
} from './utility-functions'
import localforage from 'localforage'

const initialState = {
  levels: {
    1: [{
      id: 1,
      name: '100 Level First Semester',
      levelid: 1,
      level: 100,
      courses: [
        // { id: 1, name: 'MTH 101', grade: 'A', units: 4 },
        // { id: 2, name: 'PHY 101', grade: 'B', units: 6 }
      ],
      form: {
        name: '',
        grade: '',
        units: '',
        courseid: null
      },
      // details: {
      //   tnu: 10,
      //   tgp: 44,
      //   gpa: 4.4,
      //   noc: 2
      // },
      details: {
        tnu: null,
        tgp: null,
        gpa: null,
        noc: null
      },
      editing: false,
    },
    {
      id: 2,
      name: '100 Level Second Semester',
      levelid: 1,
      level: 100,
      courses: [
        // { id: 1, name: 'MTH 102', grade: 'C', units: 3 },
        // { id: 2, name: 'PHY 102', grade: 'B', units: 2 }
      ],
      form: {
        name: '',
        grade: '',
        units: '',
        courseid: null
      },
      // details: {
      //   tnu: 4,
      //   tgp: 17,
      //   gpa: 4.25,
      //   noc: 2
      // },
      details: {
        tnu: null,
        tgp: null,
        gpa: null,
        noc: null
      },
      editing: false
    }]
  },
  currentLevelId: 1,
  currentLevel: [],
  cummulative: {
    ctnu: null,
    ctgp: null,
    // cgpa: 4.36,
    cgpa: null
  },
  sync: {
    isSaved: true
  }
}

localforage.getItem('app state')
  .then(res => {
    if (res) {
      console.log(res)
      return;
    }
    else {
      console.log('About to set item')
      localforage.setItem('app state', `${initialState}`).then(res => console.log(res))
    }
  })
  .catch(err => console.log(err))


async function getInitialState(){
  const res = await localforage.getItem('app state');
  console.log(res)
  return res;
}
getInitialState()

function Reducer(state = getInitialState(), action) {
  switch (action.type) {
    case "SET_CURRENT":
      // sendToBrowserStore({
      //   ...state,
      //   currentLevel: state.levels[action.id],
      // })
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
        currentLevel: arrangeLevel(state.levels[action.payload.levelid])
      }
    case 'DELETE_SEMESTER':
      return handleDeleteSemester(state, action)

    case 'SET_CURRENT_USING_LEVEL':
      return (
        setCurrentUsingLevel(state, action)
      )
    default:
      return state
  }
}
export default Reducer;
