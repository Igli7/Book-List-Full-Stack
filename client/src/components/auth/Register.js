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
  }, [error,isVerified, props.history]);

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

  const onSubmit = (e) => {
    e.preventDefault();

    if (name === '' || email === '' || password === '') {
      setAlert('Please Enter all fields', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
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
      <a className='logo logoText landingLogo' style={{ paddingBottom: '1em' }}>
        My<span>Book </span> List
      </a>
      <Alerts />
      <div className='registerForm'>
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
            />
            <label htmlFor='password' className='labelName'>
              <span className='contentName'>Password</span>
            </label>
          </div>
          <div className='text'>
            <input
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
