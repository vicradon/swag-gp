import React from 'react'
import '../../css/pop-ups.css'


export default function SemesterMenu() {
  return (
    <div className = "levels-cont">
      <div className="levels">
        <span className="active-lev-cont level">
          <span>Active Level</span><span className="level active-level wobble-hor-bottom">200 Level</span>
        </span>
        <span className="main-levels">
          <div data-id="1" className="level">
            <p data-anijs="if: click, do: wobble-hor-bottom, to: .active-level" className="level-name">100 Level</p>
            <p className="levels-actions">
              <i className="material-icons delete-level">delete</i>
            </p>
          </div>
          <div data-id="2" className="level">
            <p data-anijs="if: click, do: wobble-hor-bottom, to: .active-level" className="level-name">200 Level</p>
            <p className="levels-actions">
              <i className="material-icons delete-level">delete</i>
            </p>
          </div></span>
        <form className="level add-level-form">
          <select name="level-select" id="level-select">
            <option disabled>Choose Level</option>
            <option value="100">100</option>
            <option value="200">200</option>
            <option value="300">300</option>
            <option value="400">400</option>
            <option value="500">500</option>
            <option value="600">600</option>
            <option value="700">700</option>
            <option value="800">800</option>
            <option value="900">900</option>
          </select>
          <button className="add-level-but">Add New</button>
        </form>
      </div>
    </div>
  );
}