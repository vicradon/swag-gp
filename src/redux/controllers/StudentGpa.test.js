import StudentGpa from "./StudentGpa";
let studentGpa;

const testCourses = [
  {
    name: "course 1",
    units: 2,
    grade: "C",
  },
  {
    name: "course 2",
    units: 4,
    grade: "A",
  },
  {
    name: "course 3",
    units: 1,
    grade: "B",
  },
];

beforeEach(() => {
  studentGpa = new StudentGpa();
});

describe("Cumulative check", () => {
  test("cumulative properties should be 0", () => {
    expect(studentGpa.studentDetails.cumulative.total_units).toBe(0);
    expect(studentGpa.studentDetails.cumulative.total_grade_point).toBe(0);
    expect(studentGpa.studentDetails.cumulative.grade_point_average).toBe(0);
  });
});