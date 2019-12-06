import React from 'react'
import '../../css/semester-card.css'

export default function Summary({details, cgpa}){
  const {tnu, noc, tgp, gpa} = details;
  return (
    <div className = "summary">
      <p>Number of courses = {noc}</p>
      <p>Total units = {tnu}</p>
      <p>Total grade point = {tgp}</p>
      <p>Grade Point Average = {gpa}</p>
      <p>Cummulative = {cgpa}</p>
    </div>
  ) 
}