import React from 'react'
import '../../css/pop-ups.css'
import { connect } from 'react-redux'

const mapState = state => {
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
        "name": j.name
      }
    }
    levelsDetails[i] = temp;
    temp = {}
  }
  return { levelsDetails }
}
/*
{
  1:{
    1: { tnu: 10, tgp: 44, gpa: 4.4, level: 100 }
    2: { tnu: 4, tgp: 17, gpa: 4.25, level: 100 }
  }
}
*/
function displaySummaries(levelsDetails) {
  let nodes = [];
  for (let i in levelsDetails) {
    const keys = Object.keys(levelsDetails[i]);
    let node = keys.map(x => levelsDetails[i][x])
    // const level = 
    console.log(node)
    // .map(x => {
    //   return (
    //     <div key = {x.id} data-id={x.id} className="level">
    //       <p data-anijs="if: click, do: wobble-hor-bottom, to: .active-level" className="level-name">{x.level} Level</p>
    //       <div>

    //       </div>
    //       <div className="level-gpa levels-actions">
    //         <p>{x.name}{" "}{x.gpa}</p>
    //       </div>
    //     </div>
    //   )
    // })
    // nodes.push(...node)
  }
  return nodes;
}

function SummaryModal({ levelsDetails }) {
  return (
    <div className="levels-cont">
      <div className="levels">
        <span className="active-lev-cont level">
          <span>CGPA</span><span className="level active-level wobble-hor-bottom">4.76</span>
        </span>
        <span className="main-levels">
          {displaySummaries(levelsDetails)}
        </span>
      </div>
    </div>
  );
}
export default connect(mapState)(SummaryModal);


 // i.map(x => ({
      //   [tnu]: x.details.tnu,
      //   [tgp]: x.details.tgp,
      //   [gpa]: x.details.gpa,
      // }))