import React, { useState } from "react";
import "../../css/semester-form-card.css";
import { addCourse } from "../../redux/actions/gpa";
import { useDispatch } from "react-redux";

const AddCourse = ({ semester, level }) => {
  const dispatch = useDispatch();
  const defaultFormState = { courseName: "course 1", grade: "A", units: "4" };
  const [courseDetails, setCourseDetails] = useState(defaultFormState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setCourseDetails({ ...courseDetails, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(addCourse(courseDetails, semester, level));
    setCourseDetails(defaultFormState);
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="input-select">
        <label className="full-width">
          <input
            type="text"
            className="semester-form-input"
            placeholder="Course Name"
            value={courseDetails.courseName}
            name="courseName"
            onChange={handleInputChange}
            required={true}
          />
        </label>
        <label>
          <select
            onChange={handleInputChange}
            value={courseDetails.grade}
            name="grade"
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
            type="number"
            min="1"
            max="10"
            className="semester-form-input"
            placeholder="Units"
            onChange={handleInputChange}
            value={courseDetails.units}
            name="units"
            required={true}
          />
        </label>
      </div>

      <div className="form-actions">
        <button type="submit" className="semester-button add-course">
          Add
        </button>
      </div>
    </form>
  );
};

export default AddCourse;
