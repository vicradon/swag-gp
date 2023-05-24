import { nanoid } from "nanoid";
import { AnyObject } from "./types";

class LocalBackend {
  get = (item: string) => {
    return JSON.parse(localStorage.getItem(item) || "[]");
  };
  set = (item: string, data: any) => {
    localStorage.setItem(item, JSON.stringify(data));
  };

  computeCumulativeGPA = () => {
    const courses = this.get("courses");
    const totalCredits = courses.reduce((acc: number, course: any) => {
      return acc + course.credit;
    }, 0);
    const totalGradePoints = courses.reduce((acc: number, course: any) => {
      return acc + course.gradePoint;
    }, 0);
    const cumulativeGPA = totalGradePoints / totalCredits;
    this.set("cumulativeGPA", cumulativeGPA);
  };

  routes: Record<string, any> = {
    "/api/v1/courses": {
      get: () => {
        return this.get("courses");
      },
      post: (data: AnyObject) => {
        const courses = this.get("courses");
        localStorage.setItem(
          "courses",
          JSON.stringify([...courses, { id: nanoid(), ...data }])
        );
        this.computeCumulativeGPA();
        return this.get("cumulativeGPA");
      },
    },
  };

  resolve(url: string, method: string, data?: AnyObject) {
    return this.routes[url][method](data);
  }
}

const localBackend = new LocalBackend();
export default localBackend;

/**
 * We have the method, url, and data
 * We want to call a function that updates localStorage so it matches the expected application state
 * So we simply check if the method is a POST an
 */
