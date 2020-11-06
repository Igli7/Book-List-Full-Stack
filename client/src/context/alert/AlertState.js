import React, { useReducer } from 'react';
import AlertContext from './alertContext';
import alertReducer from './alertReducer';
import { v4 as uuidv4 } from 'uuid';
import { REMOVE_ALERT, SET_ALERT, CLOSE_ALERT } from '../types';

const AlertState = (props) => {
  const initialState = {
    alerts: [],
  };

  const [state, dispatch] = useReducer(alertReducer, initialState);

  // Set Alert
  const setAlert = (msg, type, timeout = 9000) => {
    const id = uuidv4();
    dispatch({
      type: SET_ALERT,
      payload: { msg, type, id },
    });

    setTimeout(() => dispatch({ type: REMOVE_ALERT, payload: id }), timeout);
  };

  // changeTimeout

  const closeAlert = () => {
    dispatch({
      type: CLOSE_ALERT,
    });
  };

  return (
    <AlertContext.Provider
      value={{
        alerts: state.alerts,
        timeout: state.timeout,
        setAlert,
        closeAlert,
      }}
    >
      {props.children}
    </AlertContext.Provider>
  );
};

export default AlertState;
