import StudentGpa from "../controllers/StudentGpa";

export const studentGpa = new StudentGpa();

const studentDetailsReducer = (state = studentGpa.studentDetails, action) => {
  switch (action.type) {
    case "ADD_COURSE": {
      const {
        course: { courseName: name, grade, units },
        semester,
        level,
      } = action.payload;
      studentGpa.addCourse(name, grade, units, semester, level);
      return studentGpa.studentDetails;
    }
    case "UPDATE_COURSE": {
      studentGpa.updateCourse(action.payload.course);
      return studentGpa.studentDetails;
    }
    case "DELETE_COURSE": {
      const { id, semester, level } = action.payload;
      studentGpa.deleteCourse(id, semester, level);
      return studentGpa.studentDetails;
    }
    case "ADD_SEMESTER": {
      studentGpa.addSemester(action.payload.level);
      return studentGpa.studentDetails;
    }
    case "SET_REDUX_STORE_DATA": {
      studentGpa.studentDetails.levelsData = action.payload.data.levels;
      return studentGpa.studentDetails;
    }
    case "SWITCH_LEVEL": {
      studentGpa.checkOrAddLevel(action.payload.level);
      return studentGpa.studentDetails;
    }
    case "ADD_NEXT_LEVEL": {
      studentGpa.addNextLevel();
      return studentGpa.studentDetails;
    }
    case "DELETE_LEVEL": {
      studentGpa.deleteLevel(action.payload.level);
      return studentGpa.studentDetails;
    }
    default: {
      return state;
    }
  }
};

export default studentDetailsReducer;
