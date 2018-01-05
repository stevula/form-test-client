import { SET_QUESTION_NUMBER } from '../actions';

const questionNumber = (state = null, action) => {
  switch (action.type) {
    case SET_QUESTION_NUMBER:
      return action.questionNumber;
    default:
      return state;
  }
};

export default questionNumber;
