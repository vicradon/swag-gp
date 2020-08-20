import React from 'react'
import { connect } from 'react-redux'
import { editCourse, deleteCourse } from '../../redux/actions/gpa'

const dispatch = {
  editCourse,
  deleteCourse
}

function Course({ id, name, grade, units, semesterid, levelid, editCourse, deleteCourse, editing }) {
  const handleEdit = (event) => {
    if (!editing) {
      const course = event.target.parentNode.parentNode;
      const courseid = id;
      const semesterid = course.dataset.semesterid;
      const levelid = course.dataset.levelid;
      editCourse(courseid, semesterid, levelid)
    }
  }
  const handleDelete = event => {
    const course = event.target.parentNode.parentNode;
    const courseid = id;
    const semesterid = course.dataset.semesterid;
    const levelid = course.dataset.levelid;
    deleteCourse(courseid, semesterid, levelid)
  }
  return (
    <div data-semesterid={semesterid} data-levelid={levelid} data-id={id} className="row">
      <p className="cell">{name}</p>
      <p className="cell">{grade}</p>
      <p className="cell">{units}</p>
      <p className="cell">
        <i onClick={handleEdit} className="material-icons edit-course">edit</i>
        <i onClick={handleDelete} className="material-icons delete-course">delete</i>
      </p>
    </div>
  )
}

export default connect(null, dispatch)(Course);