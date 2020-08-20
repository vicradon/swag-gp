export function addSemester(level) {
  return {
    type: "ADD_SEMESTER",
    payload: {
      level,
    },
  };
}
