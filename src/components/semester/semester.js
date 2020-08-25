import React from "react";
import AddCourse from "./add-course";
import EditCourse from "./edit-course";
import Table from "./table";
import Summary from "./summary";
import { useSelector } from "react-redux";
import "../../css/semester-card.css";
import "../../css/semester-grade-table.css";
import "../../css/semester-form-card.css";
import "../../css/position.css";

function Semester({ name, level, courses }) {
  const { isEditing, semesterBeingEdited } = useSelector((state) => {
    return {
      isEditing: state.componentActivity.isEditing,
      semesterBeingEdited: state.componentActivity.semesterBeingEdited,
      cumulative: state.levels.cumulative
    };
  });

  return (
    <section className="semester-card">
      <div className="semester-details">
        <p>{name}</p>
        <p>{level} level</p>
      </div>

      {isEditing && semesterBeingEdited === name ? (
        <EditCourse />
      ) : (
        <AddCourse className="semester-form" semester={name} level={level} />
      )}

      <Table courses={courses} semester={name} level={level} />

      <Summary />
    </section>
  );
}

export default Semester;
