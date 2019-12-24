import {auth, db} from '../firebase/index'

let initialState = {
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

if (localStorage.getItem('app state')) {
  initialState = JSON.parse(localStorage.getItem('app state'))
} else if (auth.currentUser !== null) {
  initialState = db.collection('users').doc(auth.currentUser.uid).appState;
}

export default initialState;