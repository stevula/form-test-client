import { SET_TIMER, TICK_TIMER } from '../actions';

const timer = (state = 0, action) => {
  switch (action.type) {
    case SET_TIMER:
      return action.ms;
    case TICK_TIMER:
      return state - 1000 > 0 ? state - 1000 : 0;
    default:
      return state;
  }
};

export default timer;
