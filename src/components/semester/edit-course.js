import React, { useState } from "react";
import "../../css/semester-form-card.css";
import { updateCourse, toggleEditing } from "../../redux/actions/gpa";
import { useSelector, useDispatch } from "react-redux";

function EditCourse() {
  const dispatch = useDispatch();
  const courseBeingEdited = useSelector(
    (state) => state.componentActivity.courseBeingEdited
  );
  const [course, setCourse] = useState(courseBeingEdited);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCourse({ ...course, [name]: value });
  };

  const handleCancel = (event) => {
    event.preventDefault();
    dispatch(toggleEditing(false));
  };
  const handleUpdate = (event) => {
    event.preventDefault();
    dispatch(updateCourse(course));
    dispatch(toggleEditing(false));
  };
  return (
    <form onSubmit={handleUpdate}>
      <div className="input-select">
        <label className="full-width">
          <input
            id="semester-form-course"
            type="text"
            className="semester-form-input"
            placeholder="Course Name"
            value={course.name}
            name="name"
            onChange={handleInputChange}
            required={true}
          />
        </label>

        <label>
          <select
            onChange={handleInputChange}
            value={course.grade}
            name="grade"
            id="grade-select"
            required={true}
          >
            <option disabled>Select Grade</option>
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
            value={course.units}
            name="units"
            required={true}
          />
        </label>
      </div>

      <div className="form-actions">
        <button
          type="submit"
          className="semester-button update-form"
        >
          Update
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="semester-button cancel-edit"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default EditCourse;
