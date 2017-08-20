import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form'; // must assign to form key
import posts from './posts';

const rootReducer = combineReducers({
  posts,
  form
});

export default rootReducer;
