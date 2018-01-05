import axios from 'axios';

const API_ROOT = 'http://localhost:3000';

export const AUTH_USER = 'AUTH_USER';
export const authUser = () => ({ type: AUTH_USER });

export const ADD_ERROR = 'ADD_ERROR';
export const addError = error => ({ type: ADD_ERROR, error });

export const REMOVE_ERROR = 'REMOVE_ERROR';
export const removeError = error => ({ type: ADD_ERROR, error });

export const signinUser = ({ email, password }) => (dispatch) => {
  return axios.post(`${API_ROOT}/signin`, { email, password })
    .then((response) => {
      // dispatch(removeError());
      window.localStorage.setItem('token', response.data.token);
      dispatch(authUser());
    })
    .catch(error => dispatch(addError(error.message)));
};

export const signupUser = ({ email, password }) => (dispatch) => {
  return axios.post(`${API_ROOT}/signup`, { email, password })
    .then((response) => {
      // dispatch(removeError());
      window.localStorage.setItem('token', response.data.token);
      dispatch(authUser());
    })
    .catch(error => dispatch(addError(error.response.data.message)));
};

export const DEAUTH_USER = 'DEAUTH_USER';
export const deauthUser = () => ({ type: DEAUTH_USER });

export const signoutUser = () => {
  window.localStorage.removeItem('token');
  return { type: DEAUTH_USER };
};

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const receiveQuestions = questions => ({
  type: RECEIVE_QUESTIONS,
  questions,
});

export const fetchQuestions = () => (dispatch) => {
  return axios.get(`${API_ROOT}/questions`, {
    headers: { authorization: window.localStorage.getItem('token') },
  })
    .then(response => dispatch(receiveQuestions(response.data.message)))
    .catch(error => dispatch(addError(error.response.data.message)));
};
