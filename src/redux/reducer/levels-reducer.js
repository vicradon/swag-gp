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
    default: {
      return state;
    }
  }
};

export default studentGpaReducer;
