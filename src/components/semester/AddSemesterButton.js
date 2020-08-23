import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addSemester as addSemesterBelow } from "../../redux/actions/componentActivity";

const AddSemesterButton = ({ semestersLength, level }) => {
  const dispatch = useDispatch();
  const activeLevel = useSelector(
    (state) => state.componentActivity.activeLevel
  );
  const addSemester = () => {
    dispatch(addSemesterBelow(level));
  };
  return (
    semestersLength === 1 && (
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
