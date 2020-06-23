import { createStore } from 'redux';
import rootReducer from './reducers/root';
import initResize from './utils/init_resize';

const store = createStore(rootReducer);
initResize(store);


export default store;
