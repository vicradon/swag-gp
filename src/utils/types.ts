export interface Course {
  id: number | string;
  title: string;
  code: string;
  grade: Grade;
  credit_load: number;
}

export interface Cumulative {
  grade_point_average: number | null;
  course_count: number | null;
  credit_load: number | null;
}

export type Grade = "A" | "B" | "C" | "D" | "F";

export type AnyObject = Record<string, any>;
