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
  const levDetails = levelsKeys.map(item => state.levels[item].map(item => [item.details.tnu, item.details.tgp]));

  let ctnu = 0, ctgp = 0;
  if (levDetails.length !== 0) {
    levDetails.forEach(item => {
      ctnu += +item.map(x => x[0]).reduce((x, y) => x + y);
      ctgp += +item.map(x => x[1]).reduce((x, y) => x + y);
    })
  }
  let cgpa = +(ctgp / ctnu).toFixed(2);
  if (isNaN(cgpa)) {
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

function arrangeCourses(semester) {
  const courses = semester.courses;
  const temp = courses.map(x => x.id).sort((a, b) => a - b);

  let temp1 = [];
  courses.forEach((q, ind) => {
    let y = courses.filter((x, i) => x.id === temp[ind]);
    temp1 = [...temp1, ...y]
  });
  return { ...semester, courses: temp1 };
}

export function handlePosition(state, updatedSemester, otherSemester, action) {
  if (updatedSemester.id < otherSemester.id) {
    return {
      ...state,
      levels: {
        ...state.levels,
        [+action.payload.levelid]: [updatedSemester, otherSemester],
      },
      currentLevel: [arrangeCourses(updatedSemester), otherSemester]
    }
  }
  else {
    return {
      ...state,
      levels: {
        ...state.levels,
        [+action.payload.levelid]: [updatedSemester, otherSemester],
      },
      currentLevel: [otherSemester, arrangeCourses(updatedSemester)]
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

export function handleAddNewLevel(state, action) {
  let levels = Object.keys(state.levels);
  let newid = 0;

  if (levels.length > 0) {
    newid = Math.max(...levels) + 1;
  }
  else {
    newid = 1
  }
  return {
    ...state,
    levels: {
      ...state.levels,
      [newid]: [{
        id: 1,
        name: `${action.newLevel} Level First Semester`,
        levelid: newid,
        level: action.newLevel,
        courses: [
        ],
        form: {
          name: '',
          grade: '',
          units: '',
          courseid: null
        },
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
        name: `${action.newLevel} Level Second Semester`,
        levelid: newid,
        level: action.newLevel,
        courses: [
        ],
        form: {
          name: '',
          grade: '',
          units: '',
          courseid: null
        },
        details: {
          tnu: null,
          tgp: null,
          gpa: null,
          noc: null
        },
        editing: false
      }]
    }
  }
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

export function disableScroll() {
  document.querySelector('html').style.overflow = 'hidden';
}

export function revertScroll() {
  document.querySelector('html').style.overflow = 'visible';
}

export function handleDeleteSemester(state, action) {
  const updatedLevel = state.levels[action.payload.levelid].filter(x => x.id !== +action.payload.semesterid);
  return {
    ...state,
    levels: {
      ...state.levels,
      [action.payload.levelid]: updatedLevel
    },
    currentLevel: updatedLevel
  }
}
export function setCurrentUsingLevel(state, action) {
  let a = null;
  for (let i in state.levels) {
    if (state.levels[i][0].level === +action.level) {
      a = state.levels[i]
    }
  }
  // return {
  //   ...state,
  //   currentLevel:a
  // }
  
  if (a[0].id < a[1].id) {
    return {
      ...state,
      currentLevel: [arrangeCourses(a[0]), a[1]]
    }
  }
  else {
    return {
      ...state,
      currentLevel: [a[1], arrangeCourses(a[0])]
    }
  }
}