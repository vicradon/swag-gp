export function updateDetails(courses) {
  function gtv(grade) {
    switch (grade) {
      case 'A':
        return 5;
      case 'B':
        return 4;
      case 'C':
        return 3;
      case 'D':
        return 2;
      case 'F':
        return 0;
      default:
        return null;
    }
  }
  const tnuArr1 = courses.map((x) => x.units);
  const tgpArr1 = courses.map((x) => gtv(x.grade) * x.units);

  let tnu = '';
  let tgp = '';
  let gpa = '';
  const noc = courses.length;

  if (tnuArr1.length && tgpArr1.length) {
    tnu = tnuArr1.reduce((x, y) => x + y);
    tgp = tgpArr1.reduce((x, y) => x + y);
    gpa = +(tgp / tnu).toFixed(2);
  } else {
    tnu = '';
    tgp = '';
    gpa = '';
  }
  return {
    tnu,
    tgp,
    gpa,
    noc
  };
}

export function updateCummulative(state) {
  const levelsKeys = Object.keys(state.levels);
  const levDetails = levelsKeys.map((item) =>
    state.levels[item].map((otherItem) => [otherItem.details.tnu, otherItem.details.tgp])
  );

  let ctnu = 0;
  let ctgp = 0;
  if (levDetails.length !== 0) {
    levDetails.forEach((item) => {
      ctnu += +item.map((x) => x[0]).reduce((x, y) => x + y);
      ctgp += +item.map((x) => x[1]).reduce((x, y) => x + y);
    });
  }
  let cgpa = +(ctgp / ctnu).toFixed(2);
  // eslint-disable-next-line no-restricted-globals
  if (isNaN(cgpa)) {
    cgpa = null;
  }
  return    {
    ctnu,
    ctgp,
    cgpa
  };
}
export function handleCummulative(state) {
  return {
    ...state,
    cummulative: updateCummulative(state)
  };
}

function arrangeCourses(semester) {
  const { courses } = semester;
  const temp = courses.map((x) => x.id).sort((a, b) => a - b);

  let temp1 = [];
  courses.forEach((q, ind) => {
    const y = courses.filter((x) => x.id === temp[ind]);
    temp1 = [...temp1, ...y];
  });
  return { ...semester, courses: temp1 };
}

export function handlePosition(state, updatedSemester, otherSemester, action) {
  if (updatedSemester.id < otherSemester.id) {
    return {
      ...state,
      levels: {
        ...state.levels,
        [+action.payload.levelid]: [updatedSemester, otherSemester]
      },
      currentLevel: [arrangeCourses(updatedSemester), otherSemester]
    };
  }

  return {
    ...state,
    levels: {
      ...state.levels,
      [+action.payload.levelid]: [updatedSemester, otherSemester]
    },
    currentLevel: [otherSemester, arrangeCourses(updatedSemester)]
  };
}
export function getCnS(state, action) {
  const semester = state.levels[action.payload.levelid].filter((item) => item.id === +action.payload.semesterid)[0];
  const course = semester.courses.filter((specificCourse) => specificCourse.id === +action.payload.courseid)[0];
  return { semester, course };
}

export function handleAdd(state, action) {
  const { semester } = getCnS(state, action);
  let newID = 0;
  if (semester.courses.length > 0) {
    newID = semester.courses.map((x) => x.id).sort((a, b) => b - a)[0] + 1;
  } else {
    newID = 1;
  }
  const { name, grade, units } = action.payload.newCourse;
  const newCourse = { id: newID, name, grade, units: +units };

  const newCourses = [...semester.courses, newCourse];
  const { tnu, tgp, gpa, noc } = updateDetails(newCourses);
  const updatedSemester = {
    ...semester,
    details: { tnu, tgp, gpa, noc },
    courses: newCourses
  };
  const otherSemester = state.levels[action.payload.levelid].filter(
    (item) => item.id !== +action.payload.semesterid
  )[0];

  return {
    semester,
    updatedSemester,
    otherSemester
  };
}
export function handleUpdate(state, action) {
  const { semester } = getCnS(state, action);

  const otherCourses = semester.courses.filter((course) => course.id !== +action.payload.data.id);

  const updatedCourses = [...otherCourses, action.payload.data];

  const { tnu, tgp, gpa, noc } = updateDetails(updatedCourses);
  const updatedSemester = {
    ...semester,
    details: {
      tnu,
      tgp,
      gpa,
      noc
    },
    courses: updatedCourses,
    editing: false,
    form: {
      name: '',
      grade: '',
      units: '',
      courseid: null
    }
  };
  const otherSemester = state.levels[action.payload.levelid].filter(
    (item) => item.id !== +action.payload.semesterid
  )[0];
  return {
    updatedSemester,
    otherSemester
  };
}

export function handleAddNewLevel(state, action) {
  const levels = Object.keys(state.levels);
  let newid = 0;

  if (levels.length > 0) {
    newid = Math.max(...levels) + 1;
  } else {
    newid = 1;
  }
  return {
    ...state,
    levels: {
      ...state.levels,
      [newid]: [
        {
          id: 1,
          name: `${action.newLevel} Level First Semester`,
          levelid: newid,
          level: action.newLevel,
          courses: [],
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
        },
        {
          id: 2,
          name: `${action.newLevel} Level Second Semester`,
          levelid: newid,
          level: action.newLevel,
          courses: [],
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
        }
      ]
    }
  };
}

export function handleEdit(state, action) {
  const { semester, course } = getCnS(state, action);
  const [name, grade, units] = [course.name, course.grade, course.units];

  const updatedSemester = {
    ...semester,
    form: { name, grade, units, id: action.payload.courseid },
    editing: true
  };
  const otherSemester = state.levels[action.payload.levelid].filter(
    (item) => item.id !== +action.payload.semesterid
  )[0];

  return {
    updatedSemester,
    otherSemester
  };
}

export function handleDelete(state, action) {
  const { semester } = getCnS(state, action);

  const updatedCourses = semester.courses.filter((course) => course.id !== +action.payload.courseid);

  const { tnu, tgp, gpa, noc } = updateDetails(updatedCourses);

  const updatedSemester = {
    ...semester,
    details: {
      tnu,
      tgp,
      gpa,
      noc
    },
    courses: updatedCourses
  };
  const otherSemester = state.levels[action.payload.levelid].filter(
    (item) => item.id !== +action.payload.semesterid
  )[0];

  return {
    updatedSemester,
    otherSemester
  };
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
  };
  const otherSemester = state.levels[action.payload.levelid].filter(
    (item) => item.id !== +action.payload.semesterid
  )[0];

  return {
    updatedSemester,
    otherSemester
  };
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
  };
  const otherSemester = state.levels[action.payload.levelid].filter(
    (item) => item.id !== +action.payload.semesterid
  )[0];
  return {
    updatedSemester,
    otherSemester
  };
}
export function handleSemesterDetails(state, action) {
  const { semester } = getCnS(state, action);
  const updatedSemester = {
    ...semester,
    name: action.payload.name
  };
  const otherSemester = state.levels[action.payload.levelid].filter(
    (item) => item.id !== +action.payload.semesterid
  )[0];

  return {
    updatedSemester,
    otherSemester
  };
}

export function disableScroll() {
  document.querySelector('html').style.overflow = 'hidden';
}

export function revertScroll() {
  document.querySelector('html').style.overflow = 'visible';
}

export function handleDeleteSemester(state, action) {
  const updatedLevel = state.levels[action.payload.levelid].filter((x) => x.id !== +action.payload.semesterid);
  return {
    ...state,
    levels: {
      ...state.levels,
      [action.payload.levelid]: updatedLevel
    },
    currentLevel: updatedLevel
  };
}

export function setCurrentUsingLevel(state, action) {
  let a = null;
  Object.keys(state.levels).forEach((x) => {
    if (state.levels[x][0].level === +action.level) {
      a = state.levels[x];
    }
  });

  return {
    ...state,
    currentLevel: a
  };
}

export function arrangeLevel(level) {
  if (level[0].id < level[1].id) {
    return [level[0], level[1]];
  }

  return [level[1], level[0]];
}
