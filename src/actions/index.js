import axios from 'axios';

const API_ROOT = process.env.API_ROOT || 'https://strive-back-end.herokuapp.com';

export const AUTH_USER = 'AUTH_USER';
export const authUser = () => ({ type: AUTH_USER });

export const ADD_ERROR = 'ADD_ERROR';
export const addError = error => ({ type: ADD_ERROR, error });

export const REMOVE_ERROR = 'REMOVE_ERROR';
export const removeError = error => ({ type: ADD_ERROR, error });

export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const updateEmail = email => ({ type: UPDATE_EMAIL, email });

export const signinUser = ({ email, firstName, lastName }) => (dispatch) => {
  return axios.post(`${API_ROOT}/signin`, { email, firstName, lastName })
    .then((response) => {
      // dispatch(removeError());
      window.localStorage.setItem('token', response.data.token);
      dispatch(authUser());
      dispatch(updateEmail(email));
    })
    .catch(error => dispatch(addError(error.message)));
};

export const signupUser = ({ email, firstName, lastName }) => (dispatch) => {
  return axios.post(`${API_ROOT}/signup`, { email, firstName, lastName })
    .then((response) => {
      // dispatch(removeError());
      window.localStorage.setItem('token', response.data.token);
      dispatch(authUser());
      dispatch(updateEmail(email));
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

export const sendAnswer = ({ email, questionNumber, answer }) => (dispatch) => {
  return axios.patch(
    `${API_ROOT}/answers`,
    { email, questionNumber, answer },
    { headers: { authorization: window.localStorage.getItem('token') } },
  )
    .then(() => dispatch(incrementQuestionNumber()))
    .catch(error => dispatch(addError(error.response.data.message)));
};

export const submitQuestion = ({ email, questionNumber, answer }) => (dispatch) => {
  dispatch(sendAnswer({ email, questionNumber, answer }));
  dispatch(clearFormData());
};

export const SET_TIMER = 'SET_TIMER';
const setTimer = ms => ({
  type: SET_TIMER,
  ms,
});

export const TICK_TIMER = 'TICK_TIMER';
export const tickTimer = () => ({ type: TICK_TIMER });

let timer;
export const startTimer = ms => (dispatch) => {
  clearInterval(timer);
  timer = setInterval(() => dispatch(tickTimer()), 1000);
  dispatch(setTimer(ms));
  dispatch(tickTimer());
};

export const COMPLETE_TEST = 'COMPLETE_TEST';
export const completeTest = () => ({ type: COMPLETE_TEST });

export const submitFinalQuestion = ({ email, questionNumber, answer }) => (dispatch) => {
  clearInterval(timer);
  dispatch(submitQuestion({ email, questionNumber, answer }));
  dispatch(completeTest());
};
