import React from "react";
import { useDispatch } from "react-redux";
import { addSemester as addSemesterBelow } from "../../redux/actions/componentActivity";

const AddSemesterButton = ({ semesterPosition, level }) => {
  const dispatch = useDispatch();
  const [isVisible, setVisibility] = React.useState(true);
  const addSemester = () => {
    setVisibility(false);
    dispatch(addSemesterBelow(level));
  };
  return (
    semesterPosition === 0 &&
    isVisible && (
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
