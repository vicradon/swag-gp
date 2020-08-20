import React from "react";
import Course from "./course";

export default function Table({ courses, semester, level }) {
  const course_components = courses.map((course) => {
    return (
      <Course
        key={course.id}
        id={course.id}
        name={course.name}
        grade={course.grade}
        units={course.units}
        semester={semester}
        level={level}
      />
    );
  });
  return (
    <div className="semester-grades">
      <div className="table">
        <div className="row header">
          <p className="cell">Course Name</p>
          <p className="cell">Grade</p>
          <p className="cell">Units</p>
          <p className="cell">Actions</p>
        </div>
        {course_components.length > 0 ? (
          course_components
        ) : (
          <div className="row">
            <p className="cell"></p>
            <p className="cell">No courses yet</p>
            <p className="cell"></p>
            <p className="cell"></p>
          </div>
        )}
      </div>
    </div>
  );
}
