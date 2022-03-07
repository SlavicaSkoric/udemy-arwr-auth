import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

// signup action creator:
/* export const signup = ({ email, password }) => {
  return function (dispatch) {};
}; */
// redux-thunk action creator:
export const signup = (formProps, callback) => async (dispatch) => {
  try {
    const response = await axios.post(
      'http://localhost:3090/signup',
      formProps
    );

    // make use of dispatch function:
    // call it with an action that we want to pass-send to all our middlewares and reducers in our app:
    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem('token', response.data.token);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Email in use' });
  }
};

// redux-thunk is a middleware used to make asynchronous action creators
// redux-thunk allows us to return either an action object or a function from our action creator
// if we return a function, that function will be automatically called with the dispatch function
// dispatch as many actions as you want from a single action creator and dispatch them at any time you want
// purpose of redux-thunk: allows us to get total control over the dispatch process

// signout action creator:
export const signout = () => {
  localStorage.removeItem('token');

  return {
    type: AUTH_USER,
    payload: '',
  };
};

// signin action creator:
export const signin = (formProps, callback) => async (dispatch) => {
  try {
    const response = await axios.post(
      'http://localhost:3090/signin',
      formProps
    );

    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem('token', response.data.token);
    callback();
  } catch (e) {
    dispatch({ type: AUTH_ERROR, payload: 'Invalid login credentials' });
  }
};
