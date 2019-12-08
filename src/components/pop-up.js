import React from 'react'
import '../css/popup.css'
import { revertScroll } from '../redux/utility-functions'

export default function PopUp({ children, closePopup, id, className }) {
  const { inner, closepopupcont, closepopup } = className;
  
  return (
    <div className='popup'>
      <div className={inner}>
        {children}
        <div className={closepopupcont}>
          <button
            className={closepopup}
            onClick={() => {
              closePopup(id);
              revertScroll()
            }}
          >Close</button>
        </div>

      </div>
    </div>
  )
}