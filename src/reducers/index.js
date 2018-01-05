import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import errorMessage from './errorMessage';
import isSignedIn from './isSignedIn';
import questions from './questions';

const rootReducer = combineReducers({
  errorMessage,
  form,
  isSignedIn,
  questions,
});

export default rootReducer;
