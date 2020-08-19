import React from "react";
import AddCourse from "./add-course";
import EditCourse from "./edit-course";
import Table from "./table";
import Summary from "./summary";
import SemesterActions from "./semester-actions";
import { connect } from "react-redux";
import "../../css/semester-card.css";
import "../../css/semester-grade-table.css";
import "../../css/semester-form-card.css";
import "../../css/position.css";
import "../../css/style.css";

// const mapState = state => {
//   return { cgpa: state.data.cummulative.cgpa }
// }

function Semester({
  id,
  name,
  level,
  courses,
  form,
  details,
  levelid,
  cgpa,
  editing,
}) {
  return (
    <section dataid={id} className="semester-card">
      hey
      {/* <div className="semester-details">
        <p>{name}</p>
        <p>{level}</p>
      </div>
      {editing ?
        <EditCourse form={form} semesterid={id} levelid={levelid} /> :
        <AddCourse className="semester-form" form={form} semesterid={id} levelid={levelid} />
      }

      <Table courses={courses} semesterid={id} levelid={levelid} editing={editing} />
      <Summary details={details} cgpa={cgpa} />
      <SemesterActions semestername={name} semesterid={id} levelid={levelid} /> */}
    </section>
  );
}

export default Semester;
