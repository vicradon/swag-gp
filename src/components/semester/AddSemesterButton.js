import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSemester as addSemesterBelow } from "../../redux/actions/componentActivity";

const AddSemesterButton = ({ level }) => {
  const dispatch = useDispatch();
  const activeLevel = useSelector(
    (state) => state.componentActivity.activeLevel
  );
  const addSemester = () => {
    dispatch(addSemesterBelow(level));
  };
  return (
    Object.keys(activeLevel).length === 2 && (
      <button
        style={{
          backgroundColor: "var(--primary-light)",
          color: "white",
          width: "8rem",
          height: "1.5rem",
        }}
        onClick={addSemester}
      >
        Add Semester
      </button>
    )
  );
};

export default AddSemesterButton;
