import React, { useState } from 'react'
import '../../css/semester-form-card.css'
import { handleCourseAdd } from '../../redux/actions'
import { connect } from 'react-redux'

const dispatchProps = {
  handleCourseAdd
}

function AddCourse({ form, semesterid, levelid, handleCourseAdd }) {
  const [data, setData] = useState(form);
  
  const handleInputChange = event => {
    const { name, value } = event.target
    setData({ ...data, [name]: value })
  }

  const handleReset = event => {
    event.preventDefault();
    setData(form)
  }

  const handleAdd = event => {
    event.preventDefault();
    if (data.name.trim().length !== 0 && data.grade.length !== 0 && data.grade !== "Select Grade" && data.units !== 0){
      handleCourseAdd(data, semesterid, levelid);
      setData(form)
    }
  }
  return (
    <form>
      <div className="input-select">
        <input
          type="text"
          className="semester-form-input"
          placeholder="Course Name"
          value={data.name}
          name = "name"
          onChange = {handleInputChange}
        />
        <select onChange = {handleInputChange} value = {data.grade} name="grade" >
          <option>Select Grade</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="F">F</option>
        </select>

        <input
          type="number"
          min="1"
          max = "10"
          className="semester-form-input"
          placeholder="Credits"
          onChange = {handleInputChange}
          value={data.units}
          name = "units"
        />
      </div>

      <div className="form-actions">
        <button onClick={handleReset} type="submit" className="semester-button reset-form">Reset</button>
        <button onClick={handleAdd} className="semester-button add-course">Add</button>
      </div>
    </form>
  )
}

export default connect(null, dispatchProps)(AddCourse);