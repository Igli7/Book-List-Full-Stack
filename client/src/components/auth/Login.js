import React, { useState, useContext, useEffect } from 'react';
import library from '../../photo/library.jpg';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';
import Alerts from '../layout/Alerts';
import AuthContext from '../../context/auth/authContext';
import ResetDialog from '../auth/ResetDialog';

const Login = (props) => {
  localStorage.removeItem('date');
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const {
    login,
    error,
    success,
    clearErrors,
    clearReset,
    isVerified,
    isAuthenticated,
    resendEmail,
    showResetDialog,
    resetDialog,
  } = authContext;

  useEffect(() => {
    if (error === 'Invalid Credentials') {
      setAlert(error, 'danger');
      clearErrors();
    } else if (
      error === 'Your account has not been verified. Please check your email.'
    ) {
      resendEmail(email);
      setAlert(error, 'danger');
      clearErrors();
    } else if (
      error ===
      'Your email was not found. Please double-check your email and try again.'
    ) {
      setAlert(error, 'danger');
      clearErrors();
    } else if (success !== null) {
      if (
        success === 'A Reset Password link has been sent to your email address.'
      ) {
        setAlert(success, 'success');
        clearErrors();
      }
    } else {
      if (isVerified === true && isAuthenticated === true) {
        props.history.push('/home');
      }
    }

    clearReset();
    // eslint-disable-next-line
  }, [error, isVerified, props.history, success]);

  const [user1, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user1;

  const onChange = (e) => {
    setUser({
      ...user1,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (email === '' || password === '') {
      setAlert('Please Fill iin all fields', 'danger');
    }

    login({
      email,
      password,
    });
  };

  const onReset = () => {
    resetDialog();
  };

  return (
    <div className='cont'>
      {showResetDialog === true && <ResetDialog />}
      <div className='landingContainer'>
        <div className='videoContainer'>
          <img width='100vw' height='100vh' src={library} alt=''></img>
        </div>
        <h3
          className='logo logoText landingLogo'
          style={{ paddingBottom: '0.5em', paddingTop: '1em' }}
        >
          My<span>Book </span> List
        </h3>

        <div className='registerForm' style={{ marginBottom: '2em' }}>
          <h1>Log In</h1>
          <form id='book-form' onSubmit={onSubmit}>
            <div className='text'>
              <input
                type='email'
                name='email'
                id='author'
                required
                value={email}
                onChange={onChange}
              />
              <label htmlFor='email' className='labelName'>
                <span className='contentName'>Email Address</span>
              </label>
            </div>
            <div className='text'>
              <input
                type='password'
                name='password'
                id='isbn'
                required
                value={password}
                onChange={onChange}
                autoComplete='true'
              />
              <label htmlFor='password' className='labelName'>
                <span className='contentName'>Password</span>
              </label>
            </div>

            <div className='btn'>
              <input type='submit' value='Log In' className='button' />
            </div>
          </form>

          <p>
            Don't have an Account?{' '}
            <Link
              className='link'
              to='/register'
              style={{ fontSize: '0.85em' }}
            >
              Sign Up
            </Link>{' '}
            here.
          </p>
          <p>
            Forgot Password?{' '}
            <button
              className='link'
              onClick={onReset}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              Reset
            </button>{' '}
            it here.
          </p>
        </div>
        <Alerts />
      </div>
    </div>
  );
};

export default Login;
