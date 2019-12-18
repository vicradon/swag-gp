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


// if (!a('side-nav').children
// //  && 
// //   !a('user-details') && 
// //   !a('hor-line') &&
// //   !a('user-icon') &&
// //   !a('username')
//   ) {
//   console.log(event.target)
// }


const bodyClickClose = () => {
  const body = document.querySelector('body');
  body.addEventListener('click', event => {
    // const a = (stuff) => event.target.classList.contains(stuff);
    const dontCloseNav = Array.from(document.querySelector('.side-nav').children).map(x => x.className);
    //if event.target.classList.contains an element in dontCloseNav, then do nothing, else, closeNav
    // closeNav();
    dontCloseNav.map(x => {
      if (event.target.classList.contains(x)) {
      }
      else {
        console.log(event.target)
        closeNav()
        
      }
    })

  })
}