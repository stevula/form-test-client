import { ADD_ERROR, REMOVE_ERROR } from '../actions';

const errorMessage = (state = null, action) => {
  switch (action.type) {
    case ADD_ERROR:
      return action.error;
    case REMOVE_ERROR:
      return null;
    default:
      // remove error on any action
      return null;
  }
};

export default errorMessage;
