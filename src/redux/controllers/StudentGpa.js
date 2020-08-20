export class StudentGpa {
  get semesterTemplate () {
    return {
      courses: [],
      cumulative: {
        grade_point_average: 0,
        number_of_courses: 0,
        grade_point: 0,
        units: 0,
      },
    };
  }
  levels = {
    "100": {
      semester1: { ...this.semesterTemplate },
    },
  };
  pointSystem = 5;

  addCourse = (name, grade, units, semester, level) => {
    this.levels[level][semester]["courses"].push({
      name,
      grade,
      units: Number(units),
      id: Math.random() * Math.random() * Date.now(),
    });
  };

  updateCourse = (course) => {
    const { id, name, grade, units, level, semester } = course;
    const semesterInStore = this.levels[level][semester];
    const courseInStore = semesterInStore["courses"].find(
      (course) => course.id === id
    );
    const index = semesterInStore["courses"].indexOf(courseInStore);
    const newCourse = { ...courseInStore, name, grade, units };
    semesterInStore["courses"][index] = newCourse;
  };

  deleteCourse = (id, semester, level) => {
    const semesterInStore = this.levels[level][semester];
    const courseIndex = semesterInStore["courses"].findIndex(
      (course) => course.id === id
    );
    semesterInStore["courses"].splice(courseIndex, 1);
  };

  addSemester = (level, semester = "semester2") => {
    this.levels[level][semester] = { ...this.semesterTemplate };
  };

  gradeValue(rawGrade) {
    if (!rawGrade) throw new Error("Grade not specified");
    const grade = rawGrade.toUpperCase();
    switch (grade) {
      case "A": {
        return this.pointSystem === 5 ? 5 : 4;
      }
      case "B": {
        return this.pointSystem === 5 ? 4 : 3;
      }
      case "C": {
        return this.pointSystem === 5 ? 3 : 2;
      }
      case "D": {
        return this.pointSystem === 5 ? 2 : 1;
      }
      case "F": {
        return this.pointSystem === 5 ? 0 : 0;
      }
      default:
        throw new Error("Unknown grade");
    }
  }
  get studentCumulative() {
    let totalGradePoint = 0;
    let totalUnits = 0;
    Object.keys(this.levels).forEach((level) => {
      let levelTotalGradePoint = 0;
      let levelTotalUnits = 0;
      Object.keys(this.levels[level]).forEach((semester) => {
        const semesterCummulative = this.semesterCummulative(
          this.levels[level][semester]
        );
        levelTotalGradePoint += semesterCummulative.total_grade_point;
        levelTotalUnits += semesterCummulative.units;
      });
      totalGradePoint += levelTotalGradePoint;
      totalUnits += levelTotalUnits;
    });
    return {
      total_units: totalUnits,
      total_grade_point: totalGradePoint,
    };
  }
  semesterCummulative = (semester) => {
    let number_of_courses = 0;
    let units = 0;
    let total_grade_point = 0;
    semester.courses &&
      semester.courses.forEach((course) => {
        units += course.units;
        number_of_courses++;
        total_grade_point += this.gradeValue(course.grade) * course.units;
      });

    const grade_point_average = Number((total_grade_point / units).toFixed(2));

    return {
      number_of_courses,
      units,
      total_grade_point,
      grade_point_average,
    };
  };
  cummulative = {
    total_units: this.studentCumulative.total_units,
    total_grade_point: this.studentCumulative.total_grade_point,
    grade_point_average:
      this.studentCumulative.total_grade_point /
        this.studentCumulative.total_units || 0,
  };
}

export default StudentGpa;
