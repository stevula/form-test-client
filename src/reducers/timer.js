import { SET_TIMER, TICK } from '../actions';

const timer = (state = 0, action) => {
  switch (action.type) {
    case SET_TIMER:
      return action.ms;
    case TICK:
      return state - 1000;
    default:
      return state;
  }
};

export default timer;
