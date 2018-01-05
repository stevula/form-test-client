import { AUTH_USER, DEAUTH_USER } from '../actions';

const isSignedIn = (state = false, action) => {
  switch (action.type) {
    case AUTH_USER:
      return true;
    case DEAUTH_USER:
      return false;
    default:
      return state;
  }
};

export default isSignedIn;
