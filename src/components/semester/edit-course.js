import React, { useState } from 'react'
import '../../css/semester-form-card.css'
import { updateCourse, cancelEdit } from '../../redux/actions/gpa'
import { connect } from 'react-redux'

const dispatchProps = {
  updateCourse,
  cancelEdit
}

function EditCourse({ course, semesterid, levelid, updateCourse, cancelEdit }) {
  const [courseData, setCourseData] = useState(course);

  const baseState = { name: '', grade: '', units: '' }

  const handleInputChange = event => {
    const { name, value } = event.target
    setCourseData({ ...courseData, [name]: value })
  }

  const handleReset = event => {
    event.preventDefault();
    setCourseData(baseState);
  }

  const handleCancel = event => {
    event.preventDefault();
    cancelEdit(semesterid, levelid);
  }
  const handleUpdate = event => {
    event.preventDefault();
    if (courseData.name.trim().length !== 0 && courseData.grade.length !== 0 && courseData.grade !== "Select Grade" && courseData.units > 0 && courseData.units <= 10) {
      updateCourse(courseData, semesterid, levelid);
      setCourseData(baseState)
    }
  }
  return (
    <form>
      <div className="input-select">
        <label className = "full-width">
          <input
            id="semester-form-course"
            type="text"
            className="semester-form-input"
            placeholder="Course Name"
            value={courseData.name}
            name="name"
            onChange={handleInputChange}
          />
        </label>

        <label>
          <select onChange={handleInputChange} value={courseData.grade} name="grade" id="grade-select">
            <option>Select Grade</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="F">F</option>
          </select>
        </label>
        <label>
          <input
            id="semester-form-credits"
            type="number"
            min="1"
            max="10"
            className="semester-form-input"
            placeholder="Credits"
            onChange={handleInputChange}
            value={courseData.units}
            name="units"
          />
        </label>
      </div>

      <div className="form-actions">
        <button onClick={handleReset} type="submit" className="semester-button reset-form">Reset</button>
        <button onClick={handleUpdate} className="semester-button update-form">Update</button>
        <button onClick={handleCancel} className="semester-button cancel-edit">Cancel</button>
      </div>
    </form>
  )
}

export default connect(null, dispatchProps)(EditCourse);