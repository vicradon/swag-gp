import {
  // createHistory
  navigate
} from "@reach/router"

// listen to the browser history
// const history = createHistory(window)

const onRedirectCallback = (appState) => {
  navigate('/')
  // history.push(
  //   appState && appState.targetUrl
  //     ? appState.targetUrl
  //     : window.location.pathname
  // );
};

export default onRedirectCallback
