import StudentGpa from "../controllers/StudentGpa";

const studentGpa = new StudentGpa();

const studentGpaReducer = (state = studentGpa.levels, action) => {
  switch (action.type) {
    case "ADD_COURSE": {
      const {
        course: { courseName: name, grade, units },
        semester,
        level,
      } = action.payload;
      studentGpa.addCourse(name, grade, units, semester, level);
      return studentGpa.levels;
    }
    case "UPDATE_COURSE": {
      studentGpa.updateCourse(action.payload.course);
      return studentGpa.levels;
    }
    case "DELETE_COURSE": {
      const { id, semester, level } = action.payload;
      studentGpa.deleteCourse(id, semester, level);
      return studentGpa.levels;
    }
    case "ADD_SEMESTER": {
      studentGpa.addSemester(action.payload.level);
      return studentGpa.levels;
    }
    case "SET_REDUX_STORE_DATA": {
      studentGpa.levelsData = action.payload.data.levels;
      return studentGpa.levels
    }
    default: {
      return state;
    }
  }
};

export default studentGpaReducer;
