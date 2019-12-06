export function updateDetails(courses) {
  function gtv(grade) {
    switch (grade) {
      case 'A': return 5;
      case 'B': return 4;
      case 'C': return 3;
      case 'D': return 2;
      case 'F': return 0;
      default: return null;
    }
  }
  let tnu_arr1 = courses.map(x => x.units);
  let tgp_arr1 = courses.map(x => gtv(x.grade) * x.units);

  let tnu = '';
  let tgp = '';
  let gpa = '';
  const noc = courses.length;

  if (tnu_arr1.length && tgp_arr1.length) {
    tnu = tnu_arr1.reduce((x, y) => x + y)
    tgp = tgp_arr1.reduce((x, y) => x + y);
    gpa = +(tgp / tnu).toFixed(2);
  }
  else {
    tnu = ''
    tgp = ''
    gpa = ''
  }
  return {
    tnu: tnu,
    tgp: tgp,
    gpa: gpa,
    noc: noc
  }

}

export function updateCummulative(state) {
  let levelsKeys = Object.keys(state.levels);
  const levDetails = levelsKeys.map(item => state.levels[item].map(item => [item.details.tnu, item.details.tgp]))[0];
  let ctnu = 0, ctgp = 0;
  if (levDetails.length !== 0) {
    ctnu = +levDetails.map(x => x[0]).reduce((x, y) => x + y);
    ctgp = +levDetails.map(x => x[1]).reduce((x, y) => x + y);
  }
  let cgpa = +(ctgp / ctnu).toFixed(2);
  if (isNaN(cgpa)){
    cgpa = null
  }
  return {
    ctnu: ctnu,
    ctgp: ctgp,
    cgpa: cgpa
  };
}
export function handleCummulative(state) {
  return {
    ...state,
    cummulative: updateCummulative(state),
  }
}

export function handlePosition(state, updatedSemester, otherSemester, action) {
  if (updatedSemester.id < otherSemester.id) {
    return {
      ...state,
      levels :{
        ...state.levels,
        [+action.payload.levelid]: [updatedSemester, otherSemester],
      },
      currentLevel: [updatedSemester, otherSemester]
    }
  }
  else {
    return {
      ...state,
      levels :{
        ...state.levels,
        [+action.payload.levelid]: [updatedSemester, otherSemester],
      },
      currentLevel: [otherSemester, updatedSemester]
    }
  }
}
export function getCnS(state, action) {
  const semester = state.levels[action.payload.levelid].filter(item => item.id === +action.payload.semesterid)[0];
  const course = semester.courses.filter(course => course.id === +action.payload.courseid)[0];
  return { semester: semester, course: course }
}

export function handleAdd(state, action) {
  const { semester } = getCnS(state, action);
  let newID = 0;
  if (semester.courses.length > 0) {
    newID = semester.courses[semester.courses.length - 1].id + 1;
  }
  else {
    newID = 1
  }
  const { name, grade, units } = action.payload.newCourse
  const newCourse = { id: newID, name: name, grade: grade, units: +units }

  const newCourses = [...semester.courses, newCourse];
  const { tnu, tgp, gpa, noc } = updateDetails(newCourses);
  const updatedSemester = {
    ...semester,
    details: { tnu: tnu, tgp: tgp, gpa: gpa, noc: noc },
    courses: newCourses
  }
  const otherSemester = state.levels[action.payload.levelid].filter(item => item.id !== +action.payload.semesterid)[0];

  return {
    semester: semester,
    updatedSemester: updatedSemester,
    otherSemester: otherSemester
  }
}
export function handleUpdate(state, action) {
  const { semester } = getCnS(state, action);


  const otherCourses = semester.courses.filter(course => course.id !== +action.payload.data.id);

  const updatedCourses = [...otherCourses, action.payload.data];

  const { tnu, tgp, gpa, noc } = updateDetails(updatedCourses);
  const updatedSemester = {
    ...semester,
    details: {
      tnu: tnu,
      tgp: tgp,
      gpa: gpa,
      noc: noc
    },
    courses: updatedCourses,
    editing: false,
    form: {
      name: '',
      grade: '',
      units: '',
      courseid: null
    }
  }
  const otherSemester = state.levels[action.payload.levelid].filter(item => item.id !== +action.payload.semesterid)[0];
  return {
    updatedSemester: updatedSemester,
    otherSemester: otherSemester
  }
}
export function handleAddLevel(state, action) {
  let levels = Object.keys(state).map(x => +x).filter(x => x / 1 === x);
  let newID = 0;
  if (levels.length > 0) {
    newID = levels[levels.length - 1] + 1;
  }
  else {
    newID = 1
  }
  return newID;
}
export function handleNewLevel(newID, name) {
  return [
    {
      name: 'Enter Semester name',
      id: 1,
      parentID: newID,
      level: name,
      courses: [],
      form: {
        name: '',
        grade: '',
        units: ''
      },
      tnu: '',
      tgp: '',
      gpa: ''
    },
    {
      name: 'Enter Semester name',
      id: 2,
      parentID: newID,
      level: name,
      courses: [],
      form: {
        name: '',
        grade: '',
        units: ''
      },
      tnu: '',
      tgp: '',
      gpa: ''
    }
  ]
}

export function handleEdit(state, action) {
  const { semester, course } = getCnS(state, action);
  let [name, grade, units] = [course.name, course.grade, course.units];

  const updatedSemester = {
    ...semester,
    form: { name: name, grade: grade, units: units, id: action.payload.courseid },
    editing: true,
  }
  const otherSemester = state.levels[action.payload.levelid].filter(item => item.id !== +action.payload.semesterid)[0];

  return {
    updatedSemester: updatedSemester,
    otherSemester: otherSemester
  }
}

export function handleDelete(state, action) {
  const { semester } = getCnS(state, action);


  const updatedCourses = semester.courses.filter(course => course.id !== +action.payload.courseid);

  const { tnu, tgp, gpa, noc } = updateDetails(updatedCourses);

  const updatedSemester = {
    ...semester,
    details: {
      tnu: tnu,
      tgp: tgp,
      gpa: gpa,
      noc: noc
    },
    courses: updatedCourses
  }
  const otherSemester = state.levels[action.payload.levelid].filter(item => item.id !== +action.payload.semesterid)[0];

  return {
    updatedSemester: updatedSemester,
    otherSemester: otherSemester
  }
}

export function handleResetForm(state, action) {
  const { semester } = getCnS(state, action);
  const updatedSemester = {
    ...semester,
    form: {
      name: '',
      grade: '',
      units: ''
    }
  }
  const otherSemester = state.levels[action.payload.levelid].filter(item => item.id !== +action.payload.semesterid)[0];

  return {
    updatedSemester: updatedSemester,
    otherSemester: otherSemester
  }
}

export function handleCancel(state, action) {
  const { semester } = getCnS(state, action);
  const updatedSemester = {
    ...semester,
    editing: false,
    form: {
      name: '',
      grade: '',
      units: '',
      courseid: null
    }
  }
  const otherSemester = state.levels[action.payload.levelid].filter(item => item.id !== +action.payload.semesterid)[0];
  return {
    updatedSemester: updatedSemester,
    otherSemester: otherSemester
  }
}
export function handleSemesterDetails(state, action) {
  const { semester } = getCnS(state, action);
  const updatedSemester = {
    ...semester,
    name: action.payload.name
  }
  const otherSemester = state.levels[action.payload.levelid].filter(item => item.id !== +action.payload.semesterid)[0];

  return {
    updatedSemester: updatedSemester,
    otherSemester: otherSemester
  }
}