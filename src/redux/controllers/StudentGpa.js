class StudentGpa {
  studentDetails = {
    levels: {
      "100": {
        semester1: { ...this.semesterTemplate },
      },
      "200": {
        semester1: { ...this.semesterTemplate },
      },
      "300": {
        semester1: { ...this.semesterTemplate },
      },
    },
    pointSystem:5,
    gradeValue(rawGrade, pointSystem) {
      if (!rawGrade) throw new Error("Grade not specified");
      const grade = rawGrade.toUpperCase();
      switch (grade) {
        case "A": {
          return pointSystem === 5 ? 5 : 4;
        }
        case "B": {
          return pointSystem === 5 ? 4 : 3;
        }
        case "C": {
          return pointSystem === 5 ? 3 : 2;
        }
        case "D": {
          return pointSystem === 5 ? 2 : 1;
        }
        case "F": {
          return pointSystem === 5 ? 0 : 0;
        }
        default:
          throw new Error("Unknown grade");
      }
    },
    get cumulative() {
      const getSemesterCummulative = (semester) => {
        let number_of_courses = 0;
        let units = 0;
        let total_grade_point = 0;
        semester.courses &&
          semester.courses.forEach((course) => {
            units += course.units;
            number_of_courses++;
            total_grade_point += this.gradeValue(course.grade, this.pointSystem) * course.units;
          });

        const grade_point_average = Number(
          (total_grade_point / units).toFixed(2)
        );

        return {
          number_of_courses,
          units,
          total_grade_point,
          grade_point_average,
        };
      };
      let totalGradePoint = 0;
      let totalUnits = 0;
      Object.keys(this.levels).forEach((level) => {
        let levelTotalGradePoint = 0;
        let levelTotalUnits = 0;
        Object.keys(this.levels[level]).forEach((semester) => {
          const semesterCummulative = getSemesterCummulative(
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
        grade_point_average: isNaN(
          Number((totalGradePoint / totalUnits).toFixed(2))
        )
          ? 0
          : Number((totalGradePoint / totalUnits).toFixed(2))
      };
    },
  };

  addCourse = (name, grade, units, semester, level) => {
    this.studentDetails.levels[level][semester]["courses"].push({
      name,
      grade,
      units: Number(units),
      id: Math.random() * Math.random() * Date.now(),
    });
  };

  updateCourse = (course) => {
    const { id, name, grade, units, level, semester } = course;
    const semesterInStore = this.studentDetails.levels[level][semester];
    const courseInStore = semesterInStore["courses"].find(
      (course) => course.id === id
    );
    const index = semesterInStore["courses"].indexOf(courseInStore);
    const newCourse = { ...courseInStore, name, grade, units };
    semesterInStore["courses"][index] = newCourse;
  };

  deleteCourse = (id, semester, level) => {
    const semesterInStore = this.studentDetails.levels[level][semester];
    const courseIndex = semesterInStore["courses"].findIndex(
      (course) => course.id === id
    );
    semesterInStore["courses"].splice(courseIndex, 1);
  };

  addSemester = (level, semester = "semester2") => {
    this.studentDetails.levels[level][semester] = { ...this.semesterTemplate };
  };

  addLevel = () => {};

  checkOrAddLevel = (level) => {
    if (!this.studentDetails.levels[level]) {
      this.studentDetails.levels[level] = {
        semester1: { ...this.semesterTemplate },
      };
    }
  };

  addNextLevel = () => {
    const previousHighest = Math.max(
      ...Object.keys(this.studentDetails.levels)
    );
    this.studentDetails.levels[Number(previousHighest) + 100] = {
      semester1: { ...this.semesterTemplate },
    };
  };

  deleteLevel = (level) => {
    delete this.studentDetails.levels[level];
  };

  get semesterTemplate() {
    return {
      courses: [],
      pointSystem: 5,
      cumulative() {
        const gradeValue = (rawGrade, pointSystem) => {
          if (!rawGrade) throw new Error("Grade not specified");
          const grade = rawGrade.toUpperCase();
          switch (grade) {
            case "A": {
              return pointSystem === 5 ? 5 : 4;
            }
            case "B": {
              return pointSystem === 5 ? 4 : 3;
            }
            case "C": {
              return pointSystem === 5 ? 3 : 2;
            }
            case "D": {
              return pointSystem === 5 ? 2 : 1;
            }
            case "F": {
              return pointSystem === 5 ? 0 : 0;
            }
            default:
              throw new Error("Unknown grade");
          }
        };
        let number_of_courses = 0;
        let units = 0;
        let total_grade_point = 0;
        this.courses &&
          this.courses.forEach((course) => {
            units += course.units;
            number_of_courses++;
            total_grade_point += gradeValue(course.grade, this.pointSystem) * course.units;
          });

        const grade_point_average = isNaN(
          Number((total_grade_point / units).toFixed(2))
        )
          ? 0
          : Number((total_grade_point / units).toFixed(2));
        return {
          number_of_courses,
          units,
          total_grade_point,
          grade_point_average,
        };
      },
    };
  }
  get availableLevels() {
    return Object.keys(this.studentDetails.levels);
  }
  set levelsData(data) {
    this.studentDetails.levels = data;
  }
}

export default StudentGpa;
