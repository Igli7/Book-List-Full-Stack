import React, { useReducer } from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';

import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_ERRORS,
  RESEND_SUCCESS,
  RESEND_FAIL,
  RESEND_RESET,
  SHOW_RESET_DIALOG,
  CLEAR_RESET_DIALOG,
  RESET,
  CLEAR_RESET,
  SET_TIMEOUT,
} from '../types';

const AuthState = (props) => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isVerified: null,
    loading: true,
    user: null,
    error: null,
    success: null,
    reset: null,
    showResetDialog: false,
    resetToken: localStorage.getItem('resetToken'),
    timeoutDate: null,
  };

  const [state, dispatch] = useReducer(authReducer, initialState);

  //Load User
  const loadUser = async () => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    try {
      const res = await axios.get(
        'https://book-list-full-stack.herokuapp.com/api/auth'
      );

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
      });
    }
  };

  // setUserToNull
  const setUserToNull = () => {
    dispatch({
      type: AUTH_ERROR,
    });
  };

  // Resend Email

  const resendEmail = async (email) => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };
    try {
      const res = await axios.post(
        'https://book-list-full-stack.herokuapp.com/api/resend',
        { email },
        config
      );
      dispatch({
        type: RESEND_SUCCESS,
        payload: res.data,
      });
      loadUser();
    } catch (err) {
      dispatch({
        type: RESEND_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Resend Reset

  const resendReset = () => {
    dispatch({
      type: RESEND_RESET,
    });
  };

  // Register User

  const register = async (formData) => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    try {
      const res = await axios.post(
        'https://book-list-full-stack.herokuapp.com/api/users',
        formData,
        config
      );

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Login User
  const login = async (formData) => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    try {
      const res = await axios.post(
        'https://book-list-full-stack.herokuapp.com/api/auth',
        formData,
        config
      );

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });

      loadUser();
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Reset Password
  const resetPassword = async (email) => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    try {
      const res = await axios.post(
        'https://book-list-full-stack.herokuapp.com/api/auth/recover',
        email,
        config
      );

      dispatch({
        type: RESET,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Reset

  const reset = async (password) => {
    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    try {
      await axios.post(
        `https://book-list-full-stack.herokuapp.com/api/auth/reset/${initialState.resetToken}`,
        password,
        config
      );
    } catch (err) {
      dispatch({
        type: LOGIN_FAIL,
        payload: err.response.data.msg,
      });
    }
  };

  // Clear Reset

  const clearReset = () => {
    dispatch({
      type: CLEAR_RESET,
    });
  };

  // Logout

  const logout = () => {
    dispatch({
      type: LOGOUT,
    });
  };

  // Clear Errors

  const clearErrors = () => {
    dispatch({ type: CLEAR_ERRORS });
  };

  // Show Reset Dialog

  const resetDialog = () => {
    dispatch({
      type: SHOW_RESET_DIALOG,
    });
  };

  // Clear Reset Dialog
  const clearResetDialog = () => {
    dispatch({
      type: CLEAR_RESET_DIALOG,
    });
  };

  // Set Timeout

  const setTimeout = (date) => {
    dispatch({
      type: SET_TIMEOUT,
      payload: date,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        isVerified: state.isVerified,
        loading: state.loading,
        user: state.user,
        error: state.error,
        success: state.success,
        showResetDialog: state.showResetDialog,
        resetToken: state.resetToken,
        timeoutDate: state.timeoutDate,
        register,
        clearErrors,
        resendEmail,
        resendReset,
        loadUser,
        login,
        logout,
        resetPassword,
        resetDialog,
        clearResetDialog,
        reset,
        clearReset,
        setTimeout,
        setUserToNull,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
