import React, { useState } from 'react'
import '../../css/pop-ups.css'
import { connect } from 'react-redux'
import { getLevelsDetails } from './summary-modal';
import { addNewLevel, handleLevelChange } from '../../redux/actions';


const mapState = state => {
  return {
    levelsDetails: getLevelsDetails(state),
    activeLevel: state.currentLevel[0].level
  }
}
const dispatch = {
  addNewLevel,
  handleLevelChange
}


function displayLevels(levelsDetails) {
  let tempArr = [];
  for (let i in levelsDetails) {
    const firstElem = levelsDetails[i][Object.keys(levelsDetails[i])[0]];
    tempArr.push(
      <div key={firstElem.levelid} data-id={firstElem.levelid} className="level">
        <p className="level-name">{firstElem.level} Level</p>
        <p className="levels-actions">
          <i className="material-icons delete-level">delete</i>
        </p>
      </div>
    )
  }
  return tempArr;
}
function displaySelect(levelsDetails) {
  const levels = [100, 200, 300, 400, 500, 600, 700];
  const unavailableLevels = [];
  for (let i in levelsDetails) {
    const firstElem = levelsDetails[i][Object.keys(levelsDetails[i])[0]];
    unavailableLevels.push(firstElem.level);
  }
  const availableLevels = levels.map(x => !unavailableLevels.includes(x) ? x : null).filter(Boolean);

  const tempArr = availableLevels.map(x => <option key={x} value={x}>{x}</option>)

  return {
  optionComponents:tempArr,
    firstLevel:availableLevels[0]
  }
}

function SemesterMenu({ levelsDetails, addNewLevel, handleLevelChange, activeLevel }) {
  const handleLevelNav = (event) => {
    if (event.target.classList.contains('level-name')){
      handleLevelChange(event.target.parentNode.dataset.id)
    }
  }
  const {optionComponents, firstLevel} = displaySelect(levelsDetails);
  const [selectValue, setSelectValue] = useState(firstLevel);

  const handleAdd = event => {
    event.preventDefault();
    /* THE ERROR IS POSSIBLY FROM HERE */
    addNewLevel(selectValue)
  }

  return (
    <div className="levels-cont">
      <div className="levels">
        <span className="active-lev-cont level">
          <span>Active Level</span><span className="level active-level wobble-hor-bottom">{activeLevel} Level</span>
        </span>
        <span onClick = {handleLevelNav} className="main-levels">
          {displayLevels(levelsDetails)}
        </span>
        <form className="level add-level-form">

          <select value = {selectValue} onChange = {event => setSelectValue(event.target.value)} name="level-select" id="level-select">
            <option disabled>Choose Level</option>
            {optionComponents}
          </select >

          <button onClick={handleAdd} className="add-level-but">Add New</button>
        </form>
      </div>
    </div>
  );
}

export default connect(mapState, dispatch)(SemesterMenu);