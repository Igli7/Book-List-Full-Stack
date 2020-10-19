import React, { useState, useContext } from 'react';
import library from '../../photo/library.jpg';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';
import Alerts from '../layout/Alerts';

const Login = () => {
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const { email, password } = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    console.log('Login submit');
  };

  return (
    <div className='cont'>
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
        <Alerts />
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
            <Link className='link' to='/register'>
              Sign Up
            </Link>{' '}
            here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
