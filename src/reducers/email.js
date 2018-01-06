import { UPDATE_EMAIL } from '../actions';

const email = (state = null, action) => {
  switch (action.type) {
    case UPDATE_EMAIL:
      return action.email;
    default:
      return state;
  }
};

export default email;
