import React, { useState } from "react";
import Semester from "./semester/semester";
// import store from '../redux/store'
// import { setCurrent } from '../redux/actions'
import { useSelector } from "react-redux";
import AddSemesterButton from "./semester/AddSemesterButton";

// const mapStateToProps = state => {
//   return {
//     currentSemesters: state.data.currentLevel,
//     currentLevelId: state.data.currentLevelId
//   }
// };
// const mapDispatchToProps = {
//   setCurrent
// };

// const { currentLevelId } = mapStateToProps(store.getState());
// store.dispatch(setCurrent(currentLevelId));

const Main = () => {
  const { semesters, activeLevel } = useSelector((state) => {
    return {
      activeLevel: state.componentActivity.activeLevel,
      semesters: state.levels[state.componentActivity.activeLevel],
    };
  });

  return (
    <main>
      {Object.keys(semesters).map((semester, index) => {
        return (
          <React.Fragment key={`${semester}${index}${activeLevel}`}>
            <Semester
              level={activeLevel}
              name={semester}
              courses={semesters[semester].courses}
            />
            <AddSemesterButton semesterPosition={index} level={activeLevel} />
          </React.Fragment>
        );
      })}
    </main>
  );
};

export default Main;

// <Semester
// key={`${semester}`}
// id={semester.id}
// name={semester.name}
// level={semester.level}
// courses={semester.courses}
// form={semester.form}
// details={semester.details}
// editing={semester.editing}
// levelid={semester.levelid}
// />
