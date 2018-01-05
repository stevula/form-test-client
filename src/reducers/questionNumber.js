import { SET_QUESTION_NUMBER } from '../actions';

const questionNumber = (state = 0, action) => {
  switch (action.type) {
    case SET_QUESTION_NUMBER:
      return action.questionNumber;
    default:
      return state;
  }
};

export default questionNumber;
