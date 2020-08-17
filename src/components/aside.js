import React, { useState, useRef } from 'react'
import '../css/nav-aside.css'
import '../css/popup.css'
import '../css/pulse.css'
import SemesterMenu from './modals/sem-menu'
import SummaryModal from './modals/summary-modal'
import PopUp from './pop-up'
import { disableScroll } from '../redux/utility-functions'
import { connect } from 'react-redux'
import store from '../redux/store'
import { auth, db } from '../firebase'


function mapState(state) {
  return state
}

function Aside() {
  function pulsateSaveButton(saveButton) {
    if (auth.currentUser !== null) {
      if (saveButton.current !== null){
        saveButton.current.classList.add('orange')
      }
    }
  }
  
  function turnOffPulsation(saveButton) {
    db.collection('users').doc(auth.currentUser.uid).set({
      [`${auth.currentUser.uid}`]: JSON.parse(localStorage.getItem(auth.currentUser.uid))
    })
    .then(() => {
      saveButton.current.classList.remove('orange')
    })
  }
  store.subscribe(() => pulsateSaveButton(saveButton));

  const saveButton = useRef(null);

  const [semesterMenuActive, setSemesterMenuActive] = useState(false);
  const [summaryModalActive, setSummaryModalActive] = useState(false);
  const closeModal = (id) => {
    if (id === 1) {
      setSemesterMenuActive(false)
    }
    else if (id === 2) {
      setSummaryModalActive(false)
    }
  }
  const className = {
    inner: 'modal-inner',
    closepopup: 'close-modal',
    closepopupcont: "close-modal-cont"
  }
  const className1 = {
    inner: 'summary-inner',
    closepopup: 'close-modal',
    closepopupcont: "close-summary-cont"
  }

  const setModal = () => {
    if (semesterMenuActive) {
      return (
        <PopUp
          closePopup={closeModal}
          id={1}
          className={className}
        >
          <SemesterMenu modalid={1} closeModal={closeModal} />
        </PopUp>
      )
    }
    else if (summaryModalActive) {
      return (
        <PopUp
          closePopup={closeModal}
          id={2}
          className={className1}
        >
          <SummaryModal />
        </PopUp>
      )
    }
  }
  // function displaySaved(){
  //   return localforage.getItem('isSaved')
  //   .then(res => {
  //     return res ? <p>Hello</p> :
  //       <i style={{ fontSize: 35 }} id="save-changes" className="material-icons add-icon">save</i>
  //   })
  // }
  return (
    <aside>
      {
        setModal()
      }


      <i style={{ fontSize: 35 }} onClick={() => turnOffPulsation(saveButton)} ref={saveButton} id="save-changes" className="material-icons add-icon">save</i>


      <i onClick={() => { setSemesterMenuActive(true); disableScroll() }} style={{ fontSize: 35 }} id="expose-levels" className="material-icons add-icon">keyboard_arrow_right</i>
      <i onClick={() => { setSummaryModalActive(true); disableScroll() }} style={{ fontSize: 35 }} id="expose-summary" className="material-icons add-icon">school</i>

      {/* FUTURE ADDITIONS: DO NOT DELETE! */}
      {/* <i style={{fontSize: 35}} id="show-chart" className="material-icons">show_chart</i>
        <i style={{fontSize: 35}} className ="material-icons add-icon">settings</i> */}
    </aside>
  )
}

export default connect(mapState)(Aside);