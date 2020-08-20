export function setCurrent(id) {
  return {
    type: "SET_CURRENT",
    id: id,
  };
}

export function fillEditForm(id, name, grade, units, semester, level) {
  return {
    type: "FILL_EDIT_FORM",
    payload: {
      id,
      name,
      grade,
      units,
      semester,
      level,
    },
  };
}
export function deleteCourse(id, semester, level) {
  return {
    type: "DELETE_COURSE",
    payload: {
      id,
      semester,
      level,
    },
  };
}

export function addCourse(course, semester, level) {
  return {
    type: "ADD_COURSE",
    payload: {
      course,
      semester,
      level,
    },
  };
}
export function updateCourse(course) {
  return {
    type: "UPDATE_COURSE",
    payload: { course },
  };
}

export function handleUpdateSemesterDetails(name, semesterid, levelid) {
  return {
    type: "UPDATE_SEMESTER_DETAILS",
    payload: {
      semesterid: semesterid,
      levelid: levelid,
      name: name,
    },
  };
}

export function addNewLevel(newLevel) {
  return {
    type: "ADD_NEW_LEVEL",
    newLevel: newLevel,
  };
}

export function handleLevelChange(levelid) {
  return {
    type: "HANDLE_LEVEL_CHANGE",
    payload: {
      levelid: levelid,
    },
  };
}

export function deleteSemester(semesterid, levelid) {
  return {
    type: "DELETE_SEMESTER",
    payload: {
      semesterid: semesterid,
      levelid: levelid,
    },
  };
}

export function setCurrentUsingLevel(level) {
  return {
    type: "SET_CURRENT_USING_LEVEL",
    level: level,
  };
}

export function startApp(newState) {
  return {
    newState: newState,
    type: "START_APP",
  };
}

export function toggleEditing(bool) {
  return {
    type: "TOGGLE_EDITING",
    payload: {
      isEditing: bool,
    },
  };
}
