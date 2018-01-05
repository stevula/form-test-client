import { INCREMENT_QUESTION_NUMBER } from '../actions';

const questionNumber = (state = 0, action) => {
  switch (action.type) {
    case INCREMENT_QUESTION_NUMBER:
      return state + 1;
    default:
      return state;
  }
};

export default questionNumber;
