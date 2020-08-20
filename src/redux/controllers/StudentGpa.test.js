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
  test("cummulative properties should be 0", () => {
    expect(studentGpa.cummulative.total_units).toBe(0);
    expect(studentGpa.cummulative.total_grade_point).toBe(0);
    expect(studentGpa.cummulative.grade_point_average).toBe(0);
  });

  test("CGPA should be ", () => {});
});

test("semester cummulative properties should be returned", () => {
  const semester = {
    courses: testCourses,
  };
  const expectedResult = {
    number_of_courses: 3,
    units: 7,
    total_grade_point: 30,
    grade_point_average: 4.29,
  };
  expect(studentGpa.semesterCummulative(semester)).toEqual(expectedResult);
});

test("It should add a new course", () => {
  studentGpa.addCourse("Course 1", "A", 4, "semester1", "100");
  const actualCourse = studentGpa.levels["100"].semester1.courses[0];
  const expectedCourse = {
    name: "Course 1",
    grade: "A",
    units: 4,
  };
  expect(actualCourse).toMatchObject(expectedCourse);
});

test("It should remove a course with name = 'couurse 2'", () => {});

test("It should update a course with name = 'course 2' to 'some random course'", () => {});

test("It should delete a course with id='2'", () => {});

test("It should add a new semester to 100 level", () => {});

test("It should add a new level", () => {});
