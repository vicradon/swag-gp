import React, { useState } from 'react'
import '../../css/semester-form-card.css'
import { handleCourseAdd } from '../../redux/actions'
import { useDispatch } from 'react-redux'

function AddCourse({ form, semesterId, levelId }) {
  const dispatch = useDispatch()
  const [courseDetails, setCourseDetails] = useState(form);

  const handleInputChange = event => {
    const { name, value } = event.target
    setCourseDetails({ ...courseDetails, [name]: value })
  }

  const handleReset = event => {
    event.preventDefault();
    setCourseDetails(form)
  }

  const handleAdd = event => {
    event.preventDefault();
    if (courseDetails.name.trim().length !== 0 && courseDetails.grade.length !== 0 && courseDetails.grade !== "Select Grade" && courseDetails.units > 0 && courseDetails.units <= 10) {
      dispatch(handleCourseAdd(courseDetails, semesterId, levelId))
      setCourseDetails(form)
    }
  }
  return (
    <form>
      <div className="input-select">
        <label className = "full-width">
          <input
            type="text"
            className="semester-form-input"
            placeholder="Course Name"
            value={courseDetails.name}
            name="name"
            onChange={handleInputChange}
          />
        </label>
        <label>
          <select
            onChange={handleInputChange}
            value={courseDetails.grade}
            name="grade"
          >
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
            type="number"
            min="1"
            max="10"
            className="semester-form-input"
            placeholder="Units"
            onChange={handleInputChange}
            value={courseDetails.units}
            name="units"
          />
        </label>
      </div>

      <div className="form-actions">
        <button onClick={handleReset} type="submit" className="semester-button reset-form">Reset</button>
        <button onClick={handleAdd} className="semester-button add-course">Add</button>
      </div>
    </form>
  )
}

export default AddCourse;