import React from "react";
import "../../css/semester-card.css";
import { useSelector } from "react-redux";

export default function Summary({ cumulative }) {
  const cgpa = useSelector((state) => state.studentDetails.cumulative.grade_point_average)
  return (
    <div className="summary">
      <div>
        <span>Course Count = </span>
        <span>{cumulative.number_of_courses}</span>
      </div>
      <div>
        <span>Grade Point Average = </span>
        <span>{cumulative.grade_point_average}</span>
      </div>
      <div>
        <span>Cumulative Grade Point Average = </span>
        <span>{cgpa}</span>
      </div>
    </div>
  );
}
