import axios from 'axios';

const API_ROOT = 'http://localhost:4000';

export const AUTH_USER = 'AUTH_USER';
export const authUser = () => ({ type: AUTH_USER });

export const ADD_ERROR = 'ADD_ERROR';
export const addError = error => ({ type: ADD_ERROR, error });

export const REMOVE_ERROR = 'REMOVE_ERROR';
export const removeError = error => ({ type: ADD_ERROR, error });

export const signinUser = ({ email, firstName, lastName }) => (dispatch) => {
  return axios.post(`${API_ROOT}/signin`, { email, firstName, lastName })
    .then((response) => {
      // dispatch(removeError());
      window.localStorage.setItem('token', response.data.token);
      dispatch(authUser());
    })
    .catch(error => dispatch(addError(error.message)));
};

export const signupUser = ({ email, firstName, lastName }) => (dispatch) => {
  return axios.post(`${API_ROOT}/signup`, { email, firstName, lastName })
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

export const INCREMENT_QUESTION_NUMBER = 'INCREMENT_QUESTION_NUMBER';
export const incrementQuestionNumber = questionNumber => ({
  type: INCREMENT_QUESTION_NUMBER,
  questionNumber,
});

export const fetchQuestions = () => (dispatch) => {
  return axios.get(`${API_ROOT}/questions`, {
    headers: { authorization: window.localStorage.getItem('token') },
  })
    .then(response => dispatch(receiveQuestions(response.data.questions)))
    .catch(error => dispatch(addError(error.response.data.message)));
};

export const CLEAR_FORM_DATA = 'CLEAR_FORM_DATA';
export const clearFormData = () => ({
  type: CLEAR_FORM_DATA,
});

export const submitQuestion = () => (dispatch) => {
  dispatch(incrementQuestionNumber());
  dispatch(clearFormData());
  // TODO send data to server
};

export const submitFinalQuestion = () => (dispatch) => {
  // TODO send data to server and render confirmation page
};

export const SET_TIMER = 'SET_TIMER';
const setTimer = ms => ({
  type: SET_TIMER,
  ms,
});

export const TICK = 'TICK';
export const tick = () => ({
  type: TICK,
});

let timer;
export const startTimer = ms => (dispatch) => {
  clearInterval(timer);
  timer = setInterval(() => dispatch(tick()), 1000);
  dispatch(setTimer(ms));
  dispatch(tick());
};
