import React from 'react'
import '../../css/pop-ups.css'
import { connect } from 'react-redux'

export function getLevelsDetails(state){
  const levelsDetails = {}
  for (let i in state.levels) {
    let temp = {}
    for (let j of state.levels[i]) {
      temp[j.id] = {
        "tnu": j.details.tnu,
        "tgp": j.details.tgp,
        "gpa": j.details.gpa,
        "level": j.level,
        "id": j.id,
        "name": j.name,
        "levelid":+i
      }
    }
    levelsDetails[i] = temp;
    temp = {}
  }
  return levelsDetails;
}

const mapState = state => {
  const levelsDetails = getLevelsDetails(state);
  return { levelsDetails, cgpa:state.cummulative.cgpa }
}
function getLevelCummulative(levObj){
  let ctnu = null; let ctgp = null;
  for (let i in levObj){
    ctnu += levObj[i].tnu;
    ctgp += levObj[i].tgp
  }
  let cgpa = +(ctgp/ctnu).toFixed(2);
  if (isNaN(cgpa)) cgpa = null;
  return cgpa;
}

function displaySummaries(levelsDetails) {
  let temp = [];
  for (let i in levelsDetails) {
    const firstElem = levelsDetails[i][Object.keys(levelsDetails[i])[0]];
    let tempArr = [];
    for (let j in levelsDetails[i]){
      tempArr.push(
        <div className = "summary-semester-details" key = {levelsDetails[i][j].id}>
          <p className = 'holder'><span>Name</span> <span>{levelsDetails[i][j].name}</span></p>
          <p className = 'holder'><span>GPA</span> <span>{levelsDetails[i][j].gpa}</span></p>
        </div>
      )
    }
    const cgpa = getLevelCummulative(levelsDetails[i]);
    temp.push (
      <div  className = "summary-level" key = {i}>
        <p>Level {firstElem.level}</p>
        <div className="summary-semesters">
          <p><u>Semesters</u></p>
          {
            tempArr
          }
        </div>
      <div className="level-cummulative">Level's Cummulative {cgpa}</div>
      </div>
    )
  }
  return temp;
}

function SummaryModal({ levelsDetails, cgpa }) {
  return (
    <div className="levels-cont">
      <div className="levels summaries">
        <span className="active-lev-cont active-summary-cont level">
          <span>CGPA</span><span className="level active-level summary-cgpa wobble-hor-bottom">{cgpa}</span>
        </span>
        <span className="main-levels">
          {displaySummaries(levelsDetails)}
        </span>
      </div>
    </div>
  );
}
export default connect(mapState)(SummaryModal);