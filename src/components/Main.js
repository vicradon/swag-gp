import React, { useState } from "react";
import Semester from "./semester/semester";
// import store from '../redux/store'
// import { setCurrent } from '../redux/actions'
import { useSelector } from "react-redux";

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
  const { semesters } = useSelector((state) => {
    return {
      semesters: state.levels[state.activeComponents.activeLevel],
    };
  });

  console.log(semesters);

  return (
    <main>
      {Object.keys(semesters).map((semester) => {
        return (
          <Semester key={`${semester}`} courses={semesters[semester].courses} />
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
