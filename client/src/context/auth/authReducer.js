import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  RESEND_FAIL,
  RESEND_RESET,
  SHOW_RESET_DIALOG,
  CLEAR_RESET_DIALOG,
  RESET,
  CLEAR_RESET,
  SET_TIMEOUT,
  RESEND_SUCCESS,
} from '../types';

export default (state, action) => {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
        isVerified: action.payload.isVerified,
        timeoutDate: localStorage.getItem('date'),
      };

    case LOGIN_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
        user: action.payload.user,
        isVerified: action.payload.user.isVerified,
      };
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('vToken', action.payload.verToken);
      return {
        ...state,
        ...action.payload,
        loading: false,
        user: action.payload.user,
        isVerified: action.payload.user.isVerified,
      };

    case RESEND_SUCCESS:
      return {
        ...state,
        success: action.payload,
      };

    case RESEND_RESET:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isVerified: null,
        loading: false,
        user: null,
        error: null,
      };
    case LOGOUT:
    case RESEND_FAIL:
    case REGISTER_FAIL:
    case LOGIN_FAIL:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        isVerified: null,
        loading: false,
        user: null,
        error: action.payload,
      };

    case AUTH_ERROR:
      return {
        ...state,
        user: null,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
        success: null,
      };

    case SHOW_RESET_DIALOG:
      return {
        ...state,
        showResetDialog: true,
      };

    case CLEAR_RESET_DIALOG:
      return {
        ...state,
        showResetDialog: false,
      };

    case RESET:
      localStorage.setItem('resetToken', action.payload.token);
      return {
        ...state,
        success: action.payload.msg,
      };

    case CLEAR_RESET:
      localStorage.removeItem('resetToken');
      return { ...state };

    case SET_TIMEOUT:
      return {
        timeoutDate: action.payload,
      };

    default:
      return state;
  }
};
