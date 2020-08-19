import StudentGpa from "../controllers/StudentGpa";

const studentGpa = new StudentGpa();

const studentGpaReducer = (state = studentGpa.levels, action) => {
  switch (action.type) {
    case "ADD_COURSE": {
      const { name, grade, units, semester } = action.payload;
      studentGpa.addCourse(name, grade, units, semester);
      return studentGpa.levels
    }
    default: {
      return state;
    }
  }
};

export default studentGpaReducer;
