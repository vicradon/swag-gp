let a = null;
  for (let i in state.levels) {
    if (state.levels[i][0].level === +action.level) {
      a = state.levels[i]
    }
  }
  if (a[0].id < a[1].id) {
    console.log({
      ...state,
      currentLevel: [arrangeCourses(a[0]), a[1]]
    })
    return {
      ...state,
      currentLevel: [arrangeCourses(a[0]), a[1]]
    }
  }
  else {
    console.log({
      ...state,
      currentLevel: [a[1], arrangeCourses(a[0])]
    })
    return {
      ...state,
      currentLevel: [a[1], arrangeCourses(a[0])]
    }