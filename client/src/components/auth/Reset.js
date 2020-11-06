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

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
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
