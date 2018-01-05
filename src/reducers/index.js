import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import errorMessage from './errorMessage';
import isSignedIn from './isSignedIn';
import questions from './questions';
import questionNumber from './questionNumber';

const rootReducer = combineReducers({
  errorMessage,
  form,
  isSignedIn,
  questions,
  questionNumber,
});

export default rootReducer;
