import React from "react";
import Semester from "./semester/semester";
import { useSelector } from "react-redux";
import AddSemesterButton from "./semester/AddSemesterButton";

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
