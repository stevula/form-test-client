import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import errorMessage from './errorMessage';
import isSignedIn from './isSignedIn';
import isComplete from './isComplete';
import questions from './questions';
import questionNumber from './questionNumber';
import timer from './timer';
import { CLEAR_FORM_DATA } from '../actions';

const rootReducer = combineReducers({
  errorMessage,
  form: form.plugin({
    // clear the question form on clicking next
    // https://redux-form.com/6.0.0-alpha.4/docs/faq/howtoclear.md/
    // TODO move this to own reducer file
    question: (state, action) => {
      switch (action.type) {
        case CLEAR_FORM_DATA:
          return undefined; // clear form data
        default:
          return state;
      }
    },
  }),
  isComplete,
  isSignedIn,
  questions,
  questionNumber,
  timer,
});

export default rootReducer;
