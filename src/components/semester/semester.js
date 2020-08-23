import React from "react";
import AddCourse from "./add-course";
import EditCourse from "./edit-course";
import Table from "./table";
// import Summary from "./summary";
// import SemesterActions from "./semester-actions";
import { useSelector } from "react-redux";
import "../../css/semester-card.css";
import "../../css/semester-grade-table.css";
import "../../css/semester-form-card.css";
import "../../css/position.css";

// const mapState = state => {
//   return { cgpa: state.data.cummulative.cgpa }
// }

function Semester({ name, level, courses }) {
  const { isEditing, semesterBeingEdited } = useSelector((state) => {
    return {
      isEditing: state.componentActivity.isEditing,
      semesterBeingEdited: state.componentActivity.semesterBeingEdited,
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
      {/* <Summary details={details} cgpa={cgpa} />
      <SemesterActions semestername={name} semesterid={id} levelid={levelid} /> */}
    </section>
  );
}

export default Semester;
