import React, { useState, useContext } from 'react';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import Alerts from '../layout/Alerts';

const Reset = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { setAlert } = alertContext;
  const { reset, clearReset, logout } = authContext;

  const [user, setUser] = useState({
    password: '',
    password2: '',
  });

  const { password, password2 } = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  // Check for UpperCase
  let checkForUpperCase = null;
  if (password.match(/[A-Z]/)) {
    checkForUpperCase = true;
  }

  // Check for numbers
  let checkForNumbers = null;
  if (password.match(/\d+/g)) {
    checkForNumbers = true;
  }

  // Check for Symbols
  const symbols = new RegExp(/[^A-Z a-z 0-9]/);
  let checkForSymbols = null;
  if (symbols.test(password)) {
    checkForSymbols = true;
  }

  // Check for 8-char
  let checkFor8Char = null;
  if (password.length >= 8) {
    checkFor8Char = true;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else if (
      checkForUpperCase !== true ||
      checkForNumbers !== true ||
      checkForSymbols !== true ||
      checkFor8Char !== true
    ) {
      setAlert(
        `Passwords must contain: \n An Uppercase character \n A number \n A Symbol \n At least 8 characters`,
        'danger'
      );
    } else {
      reset({
        password,
      });
      props.history.push('/login');
      clearReset();
      logout();
    }
  };

  return (
    <div className='registerForm' style={{ height: '100vh' }}>
      <Alerts />
      <h1
        style={{
          color: 'black',
          textAlign: 'center',
          marginTop: '1.5em',
          fontSize: '2.3em',
          opacity: '0.8',
        }}
      >
        Change Your Password
      </h1>
      <div className='resetBox'>
        <form id='book-form' onSubmit={onSubmit}>
          <div className='text'>
            <input
              style={{ color: 'black' }}
              type='password'
              name='password'
              required
              value={password}
              onChange={onChange}
            />
            <label htmlFor='password' className='labelName'>
              <span className='contentName'>New Password</span>
            </label>
          </div>
          <div className='text passwordCheck' style={{ textAlign: 'center' }}>
            <p
              className={checkForUpperCase && 'green'}
              style={{ color: 'black ' }}
            >
              A-Z
            </p>
            <p
              className={checkForNumbers && 'green'}
              style={{ color: 'black ' }}
            >
              1-9
            </p>
            <p
              className={checkForSymbols && 'green'}
              style={{ color: 'black ' }}
            >
              #,!./
            </p>
            <p className={checkFor8Char && 'green'} style={{ color: 'black ' }}>
              8-char
            </p>
          </div>
          <div className='text'>
            <input
              style={{ color: 'black' }}
              type='password'
              name='password2'
              required
              value={password2}
              onChange={onChange}
            />
            <label htmlFor='password2' className='labelName'>
              <span className='contentName'>Confirm Password</span>
            </label>
          </div>

          <div className='btn'>
            <input type='submit' value='Reset Password' className='button' />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reset;
