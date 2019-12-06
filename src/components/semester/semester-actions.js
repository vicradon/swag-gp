import React, { useState } from 'react'
import '../../css/semester-form-card.css'
import PopUp from '../pop-up';
import { handleUpdateSemesterDetails } from '../../redux/actions';
import { connect } from 'react-redux'

const dispatch = {
  handleUpdateSemesterDetails
}

function SemesterActions({ semesterid, levelid, semestername, handleUpdateSemesterDetails }) {
  const [editPopup, setEditPopup] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [name, setName] = useState(semestername);

  const closePopup = (id) => {
    if (id === 1) {
      setEditPopup(false)
    }
    else if (id === 2) {
      setDeletePopup(false)
    }
  }
  const className = {
    inner:'popup-inner',
    closepopup:'close-popup',
    closepopupcont:"close-popup-cont"
  }
  const handleUpdate = event => {
    event.preventDefault();
    if (name.trim().length !== 0) {
      handleUpdateSemesterDetails(name, semesterid, levelid);
      closePopup(1);
    }
  }
  const handleChange = event => {
    setName(event.target.value)
  }
  // const popupStyle = {
  //   position: "absolute",
  //   left: "25%",
  //   right: "25%",
  //   top: "25%",
  //   margin: "auto",
  //   backgroundColor: "white",
  //   padding: "1rem"
  // }
  const setPopUp = () => {
    if (editPopup) {
      return <PopUp
        semesterid={semesterid}
        levelid={levelid}
        closePopup={closePopup}
        id={1}
        className = {className}
      >
        <h3>Edit semester details</h3>
        <form className="edit-semester-details-form">
          <label>
            <span>Semester Name</span>
            <input name="semester-name" onChange={handleChange} value={name} className="semester-details-name" placeholder="semester name" />
          </label>

          <button onClick={handleUpdate} className="update-semester-details block-2">Update</button>
        </form>
      </PopUp>
    }
    else if (deletePopup) {
      return <PopUp
        semesterid={semesterid}
        levelid={levelid}
        closePopup={closePopup}
        id={2}
        className = {className}
      >
        <h3>Are you sure you want to delete this semester?</h3>
        <div className="delete-actions">
          <button className="semester-button dab dab-yes">Yes delete this semester</button>
          <button onClick={() => closePopup(2)} className="semester-button dab dab-no">No, go back</button>
        </div>

      </PopUp>
    }
  }
  return (
    <div className="semester-actions">
      <button onClick={() => setEditPopup(true)} type="submit" className="semester-button edit-semester">Edit</button>
      <button onClick={() => setDeletePopup(true)} className="semester-button delete-semester">Delete</button>
      {
        setPopUp()
      }
    </div>
  )
}

export default connect(null, dispatch)(SemesterActions);