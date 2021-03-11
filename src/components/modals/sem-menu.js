import React, { useState, useRef } from 'react'
import '../../css/pop-ups.css'
import { connect } from 'react-redux'
import { getLevelsDetails } from './summary-modal';
import { addNewLevel, handleLevelChange, setCurrentUsingLevel } from '../../redux/actions/gpa';
import { revertScroll } from '../../redux/utility-functions';


const mapState = state => {
  return {
    levelsDetails: getLevelsDetails(state.data),
    activeLevel: state.data.currentLevel[0].level
  }
}
const dispatch = {
  addNewLevel,
  handleLevelChange,
  setCurrentUsingLevel
}


function displayLevels(levelsDetails, handleAnimation) {
  let tempArr = [];
  for (let i in levelsDetails) {
    const firstElem = levelsDetails[i][Object.keys(levelsDetails[i])[0]];
    tempArr.push(
      <div key={firstElem.levelid} data-id={firstElem.levelid} className="level">
        <p onClick = {handleAnimation} className="level-name">{firstElem.level} Level</p>
        {/* DO NOT DELETE THIS COMMENT! */}
        {/* <p className="levels-actions">
          <i className="material-icons delete-level">delete</i>
        </p> */}
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

  // const tempArr = availableLevels.map(x => <option key={x} value={x}>{x}</option>)

  return {
    //DO NOT DELETE THIS COMMENT!
    // optionComponents:tempArr,
    firstLevel: availableLevels[0]
  }
}

function SemesterMenu({ levelsDetails, addNewLevel, handleLevelChange, activeLevel, closeModal, modalid, setCurrentUsingLevel }) {
  const handleLevelNav = (event) => {
    if (event.target.classList.contains('level-name')) {
      handleLevelChange(event.target.parentNode.dataset.id)
    }
  }
  //DO NOT DELETE THIS COMMENT!
  // const {optionComponents, firstLevel} = displaySelect(levelsDetails);
  const { firstLevel } = displaySelect(levelsDetails);
  const [selectValue] = useState(firstLevel);
  const handleAdd = event => {
    event.preventDefault();
    /* THE ERROR IS POSSIBLY FROM HERE */
    addNewLevel(selectValue);
    setCurrentUsingLevel(selectValue);
    closeModal(modalid);
    revertScroll();
  }

  const handleAnimation = event => {
    activeLevelRef.current.classList.toggle('wobble-hor-bottom-again');
  }
  const activeLevelRef = useRef(null);
  return (
    <div className="levels-cont">
      <div className="levels">
        <span className="active-lev-cont level">
          <span>Active Level</span><span ref = {activeLevelRef} className="level active-level wobble-hor-bottom">{activeLevel} Level</span>
        </span>
        <span onClick={handleLevelNav} className="main-levels">
          {displayLevels(levelsDetails, handleAnimation)}
        </span>
        {
          firstLevel ?
            <form className="level add-level-form">

              {/* DO NOT DELTE THIS COMMENT */}
              {/* <select value = {selectValue} onChange = {event => setSelectValue(event.target.value)} name="level-select" id="level-select">
            <option disabled>Choose Level</option>
            {optionComponents}
          </select > */}

              <p style={{ color: 'black' }}>Next Level: {firstLevel}</p>
              <button onClick={handleAdd} className="add-level-but">Add New</button>
            </form> :
            null
        }
      </div>
    </div>
  );
}

export default connect(mapState, dispatch)(SemesterMenu);