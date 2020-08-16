import React from 'react'
import Course from "./course";

export default function Table({ courses, semesterid, levelid, editing }) {
  const course_components = courses.map((x, index) => {
    return <Course
      key={index}
      id={x.id}
      name={x.name}
      grade={x.grade}
      units={x.units}
      semesterid={semesterid}
      levelid={levelid}
      editing={editing}
    />
  })
  return (
    <div className="semester-grades">
      <div className="table">

        <div className="row header">
          <p className="cell">Course Name</p>
          <p className="cell">Grade</p>
          <p className="cell">Units</p>
          <p className="cell">Actions</p>
        </div>
        {

          course_components.length > 0 ?
            course_components :
            <div className = "row">
              <p className = "cell"></p>
              <p className = "cell">No courses yet</p>
              <p className = "cell"></p>
              <p className = "cell"></p>
            </div>
        }

      </div>
    </div>
  )
}