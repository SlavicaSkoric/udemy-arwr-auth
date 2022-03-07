// auth reducer

import { AUTH_USER, AUTH_ERROR } from '../actions/types';

// all capitals - constant variable
const INITIAL_STATE = {
  authenticated: '',
  errorMessage: '',
};
// we put the initial state here so that the other engineers know what to expect

const auth = function (state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: action.payload };
    case AUTH_ERROR:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};

export default auth;
