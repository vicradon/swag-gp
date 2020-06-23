exports.setCurrent = (id) => {
  return {
    type: 'SET_CURRENT',
    id
  };
};

exports.editCourse = (courseid, semesterid, levelid) => {
  return {
    type: 'EDIT_COURSE',
    payload: {
      courseid,
      semesterid,
      levelid
    }
  };
};
exports.deleteCourse = (courseid, semesterid, levelid) => {
  return {
    type: 'DELETE_COURSE',
    payload: {
      courseid,
      semesterid,
      levelid
    }
  };
};

exports.handleCourseAdd = (newCourse, semesterid, levelid) => {
  return {
    type: 'ADD_NEW_COURSE',
    payload: {
      newCourse,
      semesterid,
      levelid
    }
  };
};
exports.updateCourse = (data, semesterid, levelid) => {
  return {
    type: 'UPDATE_COURSE',
    payload: {
      data,
      semesterid,
      levelid
    }
  };
};

exports.cancelEdit = (semesterid, levelid) => {
  return {
    type: 'CANCEL_EDIT',
    payload: {
      semesterid,
      levelid
    }
  };
};

exports.handleUpdateSemesterDetails = (name, semesterid, levelid) => {
  return {
    type: 'UPDATE_SEMESTER_DETAILS',
    payload: {
      semesterid,
      levelid,
      name
    }
  };
};

exports.addNewLevel = (newLevel) => {
  return {
    type: 'ADD_NEW_LEVEL',
    newLevel
  };
};

exports.handleLevelChange = (levelid) => {
  return {
    type: 'HANDLE_LEVEL_CHANGE',
    payload: {
      levelid
    }
  };
};

exports.deleteSemester = (semesterid, levelid) => {
  return {
    type: 'DELETE_SEMESTER',
    payload: {
      semesterid,
      levelid
    }
  };
};

exports.setCurrentUsingLevel = (level) => {
  return {
    type: 'SET_CURRENT_USING_LEVEL',
    level
  };
};
