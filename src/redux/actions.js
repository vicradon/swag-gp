export function setCurrent(id) {
  return {
    type: "SET_CURRENT",
    id: id
  };
}

export function editCourse(courseid, semesterid, levelid){
  return {
    type:'EDIT_COURSE',
    payload:{
      courseid:courseid,
      semesterid:semesterid,
      levelid:levelid
    }
  }
} 
export function deleteCourse(courseid, semesterid, levelid){
  return {
    type:'DELETE_COURSE',
    payload:{
      courseid:courseid,
      semesterid:semesterid,
      levelid:levelid
    }
  }
}

export function handleCourseAdd(newCourse, semesterid, levelid){
  return {
    type:'ADD_NEW_COURSE',
    payload:{
      newCourse:newCourse,
      semesterid:semesterid,
      levelid:levelid
    }
  }
}
export function updateCourse(data, semesterid, levelid){
  return {
    type:'UPDATE_COURSE',
    payload:{
      data:data,
      semesterid:semesterid,
      levelid:levelid
    }
  }
}

export function cancelEdit(semesterid, levelid){
  return {
    type:'CANCEL_EDIT',
    payload:{
      semesterid:semesterid,
      levelid:levelid
    }
  }
}

export function handleUpdateSemesterDetails(name, semesterid, levelid){
  return {
    type:'UPDATE_SEMESTER_DETAILS',
    payload:{
      semesterid:semesterid,
      levelid:levelid,
      name:name
    }
  }
}

export function addNewLevel(newLevel){
  return {
    type:'ADD_NEW_LEVEL',
    newLevel:newLevel
  }
}

export function handleLevelChange(levelid){
  return {
    type:'HANDLE_LEVEL_CHANGE',
    payload:{
      levelid:levelid
    }
  }
}