import React from 'react'
import Course from "./course";

export default function Table({courses, semesterid, levelid, editing}) {
  const course_components = courses.map(x => {
    return <Course 
              key = {x.id} 
              id = {x.id} 
              name = {x.name}
              grade = {x.grade} 
              units = {x.units} 
              semesterid = {semesterid}
              levelid = {levelid}
              editing = {editing}
            />
    })
  return (
    <div className = "semester-grades">
      <div className = "table">

        <div className = "row header">
          <p className = "cell">Course Name</p>
          <p className = "cell">Grade</p>
          <p className = "cell">Units</p>
          <p className = "cell">Actions</p>
        </div>

        {course_components}

      </div>
    </div>
  )
}