import React, { useContext, useState, useEffect } from 'react';
import library from '../../photo/library.jpg';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import Alerts from '../layout/Alerts';

const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;
  const { register, error, clearErrors, isVerified } = authContext;

  useEffect(() => {
    if (error === 'User already exists') {
      setAlert(error, 'danger');
      clearErrors();
    } else {
      if (isVerified === false) {
        props.history.push('/resend');
      }
    }
    // eslint-disable-next-line
  }, [error, isVerified, props.history]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = user;

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

    if (name === '' || email === '' || password === '') {
      setAlert('Please Enter all fields', 'danger');
    } else if (password !== password2) {
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
      register({
        name,
        email,
        password,
      });
    }
  };

  return (
    <div className='landingContainer'>
      <div className='videoContainer'>
        <img width='100vw' height='100vh' src={library} alt=''></img>
      </div>
      <Alerts />
      <h3
          className='logo logoText landingLogo'
          style={{ paddingBottom: '0.5em', paddingTop: '1em' }}
        >
          My<span>Book </span> List
        </h3>
      <div className='registerForm' >
        <h1>Sign Up</h1>
        <form id='book-form' onSubmit={onSubmit}>
          <div className='text'>
            <input
              type='text'
              name='name'
              required
              value={name}
              onChange={onChange}
            />
            <label htmlFor='name' className='labelName'>
              <span className='contentName'>Name</span>
            </label>
          </div>
          <div className='text'>
            <input
              type='email'
              name='email'
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
              required
              value={password}
              onChange={onChange}
              autoComplete='true'
            />
            <label htmlFor='password' className='labelName'>
              <span className='contentName'>Password</span>
            </label>
          </div>
          <div className='text passwordCheck'>
            <p className={checkForUpperCase && 'green'}>A-Z</p>
            <p className={checkForNumbers && 'green'}>1-9</p>
            <p className={checkForSymbols && 'green'}>#,!./</p>
            <p className={checkFor8Char && 'green'}>8-char</p>
          </div>
          <div className='text'>
            <input
              type='password'
              name='password2'
              required
              value={password2}
              onChange={onChange}
              autoComplete='true'
            />
            <label htmlFor='password2' className='labelName'>
              <span className='contentName'>Confirm Password</span>
            </label>
          </div>

          <div className='btn'>
            <input type='submit' value='Sign Up' className='button' />
          </div>
        </form>

        <p>
          Already have an Account?{' '}
          <Link className='link' to='/login'>
            Log in
          </Link>{' '}
          here.
        </p>
      </div>
    </div>
  );
};

export default Register;
