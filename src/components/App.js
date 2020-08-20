import React from 'react'
import { Provider } from 'react-redux'
import Routes from './Routes'
import store from '../redux/store'

const App = () => {
  return <Provider store={store}><Routes /></Provider>
}
export default App