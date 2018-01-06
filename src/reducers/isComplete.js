import { COMPLETE_TEST } from '../actions';

const isComplete = (state = false, action) => {
  switch (action.type) {
    case COMPLETE_TEST:
      return true;
    default:
      return state;
  }
};

export default isComplete;
