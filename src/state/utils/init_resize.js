const updateWindowSize = (e) => {
  return {
    type: 'UPDATE_WINDOW_SIZE',
    payload: {
      width: e.target.innerWidth,
      height: e.target.innerHeight
    }
  };
};

const initResize = (store) => {
  window.addEventListener('resize', (e) => {
    store.dispatch(updateWindowSize(e));
  });
};

export default initResize;
