import React, { Fragment, useContext, useState, useEffect } from 'react';
import AuthContext from '../../context/auth/authContext';
import AlertContext from '../../context/alert/alertContext';
import Alerts from '../layout/Alerts';

const ResetDialog = () => {
  const authContext = useContext(AuthContext);
  const alertContext = useContext(AlertContext);

  const { resetPassword, clearResetDialog, error, clearErrors } = authContext;
  const { setAlert } = alertContext;

  useEffect(() => {
    if (error) {
      // eslint-disable-next-line
      if (error.id == 1) {
        setAlert(error.msg, 'danger');
        clearErrors();
      }
    }

    // eslint-disable-next-line
  }, [error]);

  const [state, setState] = useState({
    email: '',
  });

  const { email } = state;

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const clearDialog = () => {
    clearResetDialog();
  };

  const onSubmit = (e) => {
    e.preventDefault();

    resetPassword({ email });

    clearResetDialog();
  };

  return (
    <Fragment>
      <div className='dialogBox' onClick={clearDialog}></div>
      <div className='dialog resetDialog'>
        <form action='' onSubmit={onSubmit}>
          <i
            className='fas fa-lock'
            style={{ fontSize: '2.2em', color: '#E31E1E' }}
          ></i>
          <h4 style={{ fontSize: '1.4em' }}>Reset Password</h4>
          <p>
            {' '}
            <b>Please enter your email below:</b>
          </p>

          <div className='titleInput'>
            <input
              type='email'
              name='email'
              id='email'
              placeholder='email'
              value={email}
              onChange={onChange}
              required
              style={{
                outlineColor: 'rgba(102, 205, 155, 0.8)',
                height: '30px',
              }}
            />
          </div>
          <p style={{ fontSize: '0.8em' }}>
            An email will be sent to your email address which contains a link to
            reset your password.
          </p>
          <p style={{ fontSize: '0.8em' }}>
            Please check your spam folder if you do not receive an email within
            the next 5 minutes.
          </p>
          <div className='profile-box'>
            <button
              type='submit'
              className='confirm'
              style={{
                paddingTop: '1em',
                paddingBottom: '1em',
                marginTop: '2em',
              }}
            >
              Send Link
            </button>
          </div>
        </form>
      </div>
      <Alerts />
    </Fragment>
  );
};

export default ResetDialog;
