import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  fillEditForm,
  deleteCourse,
  toggleEditing,
} from "../../redux/actions/gpa";

function Course({ id, name, grade, units, semester, level }) {
  const dispatch = useDispatch();
  const isEditing = useSelector((state) => state.componentActivity.isEditing);
  const handleEdit = () => {
    if (!isEditing) {
      dispatch(toggleEditing(true, semester));
      dispatch(fillEditForm(id, name, grade, units, semester, level));
    }
  };
  const handleDelete = () => {
    if (!isEditing) {
      dispatch(deleteCourse(id, semester, level));
    }
  };
  return (
    <div
      data-semester={semester}
      data-levelid={level}
      data-id={id}
      className="row"
    >
      <p className="cell">{name}</p>
      <p className="cell">{grade}</p>
      <p className="cell">{units}</p>
      <p className="cell">
        <FaEdit onClick={handleEdit} className="edit-course" />
        <FaTrash onClick={handleDelete} className="delete-course" />
      </p>
    </div>
  );
}

export default Course;
